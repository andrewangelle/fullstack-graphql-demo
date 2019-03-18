import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type Product {
    quantity: Int
  }
  type CurrentUser {
    isLoggedIn: Boolean
    token: String
  }
  type Cart {
    itemsCount: Int
    totalPrice: String
    items: [Product]
  }
  type Checkout {
    step: Int
    done: Boolean
    items: Boolean
    payment: Boolean
    shipping: Boolean
    userAuthorized: Boolean
    token: String
  }
`