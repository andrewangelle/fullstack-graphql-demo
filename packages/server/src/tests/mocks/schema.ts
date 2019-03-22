import gql from "graphql-tag";

export const typeDefsMock = gql`
  type Invoice {
    id: ID!
    amount: String!
    email: String!
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
    sales: [Invoice!]!
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

  input UserInput {
    id: String!
  }

  input ProductInput {
    id: String!
  }

  type Mutation {
    customerSignup(email: String!, password: String!, firstName: String!, lastName: String!,): AuthPayload!
    vendorSignup(name: String!, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    logoutUser(id: String): MutationResult
    createNewInvoice(items: [ProductInput], amount: String, email: String, vendors: [UserInput]): MutationResult!
    createNewProduct(name: String!, price: String!, description: String!, imageUrl: String, varietal: String!): MutationResult!
    checkout(
      items: [ProductInput],
      amount: String,
      email: String,
      vendors: [UserInput],
      token: String!,
      stripeId: String,
      city: String!,
      state: String!,
      zip: String!,
      street: String!,
    ): MutationResult!
  }
`


