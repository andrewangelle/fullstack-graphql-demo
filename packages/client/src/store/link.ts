import { HttpLink, ApolloLink, split } from 'apollo-boost'
import { getMainDefinition } from 'apollo-utilities';
import { WebSocketLink } from 'apollo-link-ws';
import { OperationDefinitionNode } from 'graphql';

/** http link */
const httpLink = new HttpLink({
  uri: `${process.env.REACT_APP_SERVER_URL}/bcgraph`,
})

/** auth link */
const token = localStorage.getItem('BC_AUTH') || 'bigboi';
const authLink = new ApolloLink((operation, forward: any) => {
  operation.setContext({
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return forward(operation)
})


/** websocket link */
const query = `?headers={Authorization:Bearer ${process.env.REACT_APP_PRISMA_WEB_SOCKET_TOKEN}}`
export const wsLink = new WebSocketLink({
  uri: process.env.REACT_APP_PRISMA_WEB_SOCKET_LINK + query
});



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