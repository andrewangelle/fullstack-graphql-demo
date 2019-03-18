import { ApolloClient, NormalizedCacheObject } from 'apollo-boost';

import { currentCart, cartStateSelector } from 'store/';

async function removeCartItemResolver(
  info: {},
  args: any,
  { client, cache }: { client: ApolloClient<NormalizedCacheObject>, cache: any }
) {

  const prevState = await client.readQuery({ query: currentCart })
  const next = {
    ...prevState.cart,
    items: prevState.cart.items.filter(i => i.id !== args.item.product.id)
  }
  const nextState = cartStateSelector(next)

  await client.writeQuery({
    query: currentCart,
    data: {
      cart: {
        __typename: 'Cart',
        ...nextState
      }
    }
  })

  return null
}

export { removeCartItemResolver }