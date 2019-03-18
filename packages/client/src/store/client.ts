import { ApolloClient, InMemoryCache } from 'apollo-boost';
import { persistCache } from 'apollo-cache-persist';

import {
  addCartItemResolver,
  clearCartResolver,
  link,
  loginUserResolver,
  logoutUserResolver,
  removeCartItemResolver,
  setDefaults,
  typeDefs,
  updateCartItemResolver,
} from 'store/';


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
    resolvers: {
      Mutation: {
        addCartItem: addCartItemResolver,
        clearCart: clearCartResolver,
        loginUser: loginUserResolver,
        logoutUser: logoutUserResolver,
        removeCartItem: removeCartItemResolver,
        updateCartItemQuantity: updateCartItemResolver
      }
    }
  })

  await setDefaults(client)

  return client
}

export { createClient }
