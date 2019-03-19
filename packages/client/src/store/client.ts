import { ApolloClient, InMemoryCache } from 'apollo-boost';
import { persistCache } from 'apollo-cache-persist';

import { link, setDefaults, typeDefs, resolvers } from 'store/';


async function createClient() {
  const cache = new InMemoryCache();
  await persistCache({
    cache,
    storage: window.localStorage as any
  })

  const client = new ApolloClient({
    link,
    cache,
    typeDefs,
    resolvers
  })

  await setDefaults(client)

  return client
}

export { createClient }
