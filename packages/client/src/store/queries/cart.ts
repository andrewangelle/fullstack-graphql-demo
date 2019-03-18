import gql from 'graphql-tag';

export const currentCart = gql`{
  cart @client {
    totalPrice
    itemCount
    items {
      id
      name
      price
      description
      quantity @client
      vendor {
        id
      }
    }
  }
}`

export const addCartItem = gql`
  mutation($item: CartItem) {
    addCartItem(item: $item) @client
  }
`

export const removeCartItem = gql`
  mutation($item: CartItem) {
    removeCartItem(item: $item) @client
  }
`

export const clearCart = gql`
  mutation {
    clearCart @client
  }
`

export const updateCartItemQuantity = gql`
  mutation($item: CartItem) {
    updateCartItemQuantity(item: $item) @client
  }
`