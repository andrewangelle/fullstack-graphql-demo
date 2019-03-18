import { ApolloClient, NormalizedCacheObject } from 'apollo-boost';

import { auth, accountQuery, currentUser } from 'store/';

async function loginUserResolver(
  info: {},
  { email, password }: { email: string, password: string },
  { client }: { client: ApolloClient<NormalizedCacheObject> }
) {
  const { data: { login } }: any = await client.mutate({
    mutation: auth,
    variables: { email, password },
    fetchPolicy: 'no-cache'
  })

  const accountNextState = { __typename: 'User', ...login.user, }

  const userNextState = {
    __typename: 'CurrentUser',
    id: login.user.id,
    email: login.user.email,
    isLoggedIn: !!login.user.id,
    token: login.token,
  }

  localStorage.setItem('BC_AUTH', login.token)

  client.writeQuery({
    query: accountQuery,
    data: {
      viewer: {
        __typename: 'Viewer',
        me: accountNextState
      }
    }
  })

  client.writeQuery({
    query: currentUser,
    data: { currentUser: userNextState }
  });
  return null
}

export { loginUserResolver }