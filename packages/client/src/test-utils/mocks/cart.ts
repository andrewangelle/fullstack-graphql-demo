import { currentCart } from "store/queries";

export const cartResponse = {
  __typename: 'Cart',
  itemCount: 0,
  totalPrice: 0,
  items: [{
    id: '123455',
    name: 'test product',
    description: 'test description',
    price: '16',
    varietal: 'test varietal',
    vendor: { id: '23456' }
  }]
}

export const cartMock = {
  request: { query: currentCart },
  response: { cart: cartResponse }
}