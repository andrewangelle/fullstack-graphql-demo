import { ApolloClient, NormalizedCacheObject } from 'apollo-boost';

import { currentCart, cartStateSelector } from 'store/';

function itemsSelector(state: any, { product }: { product: any }) {
  const itemToUpdate = state.items.findIndex((i) => i.id === product.id)
  const nextState = state.items.map((i, index) => {
    if (index === itemToUpdate) {
      return { ...product }
    }

    return i
  })

  return {
    ...state,
    items: nextState
  }

}

async function updateCartItemResolver(
  info: {},
  args: any,
  { client, cache }: { client: ApolloClient<NormalizedCacheObject>, cache: any }
) {

  const prevState = await client.readQuery({ query: currentCart })
  const nextState = itemsSelector(prevState.cart, args.item)

  await client.writeQuery({
    query: currentCart,
    data: { cart: cartStateSelector(nextState) }
  })

  return null
}

export { updateCartItemResolver }