import { HttpLink, ApolloLink, split } from 'apollo-boost'
import { getMainDefinition } from 'apollo-utilities';
import { WebSocketLink } from 'apollo-link-ws';
import { OperationDefinitionNode } from 'graphql';

/** http link */
const uri = process.env.REACT_APP_SERVER_URL || 'http://localhost:6006'
const httpLink = new HttpLink({ uri: `${uri}/bcgraph` })

console.log(uri)

/** auth link */
const authToken = localStorage.getItem('BC_AUTH') || 'bigboi';
const authLink = new ApolloLink((operation, forward: any) => {
  operation.setContext({
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
  return forward(operation)
})

/** websocket link */
const wsUri = process.env.REACT_APP_PRISMA_WEB_SOCKET_LINK || 'wss://localhost:6006/'
const wsToken = `${process.env.REACT_APP_PRISMA_WEB_SOCKET_TOKEN}` || ''
const query = `?headers={Authorization:Bearer ${wsToken}}`
export const wsLink = new WebSocketLink({ uri: wsUri + query });

/** link */
const link = split(({ query }) => {
  const { kind, ...rest } = getMainDefinition(query);
  return (
    kind === 'OperationDefinition' &&
    (rest as OperationDefinitionNode).operation === 'subscription'
  )
},
  wsLink,
  authLink.concat(httpLink)
);



export { link }