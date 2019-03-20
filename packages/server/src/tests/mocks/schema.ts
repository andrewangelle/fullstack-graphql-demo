import gql from "graphql-tag";

export const typeDefsMock = gql`
  type Invoice {
    id: ID!
    amount: String
    items: [Product!]!
  }

  type User {
    id: ID!
    role: String
    permissions: [String!]!
    email: String
    firstName: String
    lastName: String
    bizName: String
    password: String
    stripeId: String
    products: [Product!]!
    purchases: [Invoice!]!
  }

  type Product {
    id: ID!
    name: String
    price: String
    description: String
    varietal: String
    vendor: User
    purchases: [Invoice!]!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Viewer {
    me: User
  }

  type MutationResult {
    success: Boolean
  }

  type Query {
    viewer: Viewer
    feed: [Product!]!
  }
`


