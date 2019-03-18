import { ApolloClient, NormalizedCacheObject } from 'apollo-boost';
import { currentCart, cartDefault } from 'store/';

async function clearCartResolver(
  info: {},
  args: {},
  { client }: { client: ApolloClient<NormalizedCacheObject> }
) {

  await client.writeQuery({
    query: currentCart,
    data: {
      cart: {
        __typename: 'Cart',
        ...cartDefault
      }
    }
  })
  return null
}

export { clearCartResolver }