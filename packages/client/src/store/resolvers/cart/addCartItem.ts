import { ApolloClient, NormalizedCacheObject } from 'apollo-boost';

import { withZeroBase, toNumber } from 'utils/';
import { currentCart } from 'store/';

export function itemsSelector(state: any, product: any) {
  const itemToUpdate = state.items.findIndex((i) => i.id === product.id)

  // if adding the same product, update the quantity instead of a duplicate item
  if (itemToUpdate !== -1) {
    const nextState = state.items.map((i, index) => {
      if (index === itemToUpdate) {
        return { ...i, quantity: i.quantity + 1 }
      }

      return i
    })

    return {
      ...state,
      items: nextState
    }
  }

  // else add the item to state
  return {
    ...state,
    items: [
      ...state.items,
      { ...product, quantity: 1 }
    ]
  }
}

export function cartStateSelector(state: any) {

  const itemCount: number = state.items
    .reduce((acc, curr) => {
      return withZeroBase(acc + curr.quantity)
    }, 0)

  const totalPrice: string = state.items.reduce((currentTotal, data) => {
    const totalPrice = `${(toNumber(currentTotal) + (data.price * data.quantity))}`
    return `${withZeroBase(toNumber(totalPrice))}`
  }, 0)

  const nextState = {
    ...state,
    itemCount,
    totalPrice: toNumber(totalPrice)
  }
  return { ...nextState }
}


async function addCartItemResolver(
  info: {},
  args: any,
  { client, cache }: { client: ApolloClient<NormalizedCacheObject>, cache: any }
) {
  const prevCartState = await client.readQuery({ query: currentCart })
  const withoutDuplicate = await itemsSelector(prevCartState.cart, args.item.product)
  const nextState = await cartStateSelector(withoutDuplicate)

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

export { addCartItemResolver }

