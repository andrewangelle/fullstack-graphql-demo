import { ApolloClient, NormalizedCacheObject } from 'apollo-boost';

import { accountQuery, meDefault, currentUser, userDefault } from 'store/';

async function logoutUserResolver(
  info: {},
  args: {},
  { client }: { client: ApolloClient<NormalizedCacheObject> }
) {
  localStorage.removeItem('BC_AUTH');

  client.writeQuery({
    query: accountQuery,
    data: {
      viewer: {
        __typename: 'Viewer',
        me: meDefault
      }
    }
  });

  client.writeQuery({
    query: currentUser,
    data: {
      currentUser: {
        __typename: 'CurrentUser',
        ...userDefault
      }
    }
  });
  return null
}

export { logoutUserResolver }