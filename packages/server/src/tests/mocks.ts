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

export const productsExpected = {
  id: '1',
  name: 'A String',
  description: 'A String',
  price: 'A String'
}

export const productsQueryTest = {
  id: 'Products Query Test',
  query: `
    query {
      feed {
        id
        name
        description
        price
      }
    }
  `,
  variables: {},
  context: {
    headers: {
      Authorization: 'Bearer bigboi'
    }
  },
  expected: {
    data: {
      feed: [productsExpected, productsExpected]
    }
  }
};

const purchaseMock = {
  id: '1',
  amount: 'A String',
  items: [productsExpected, productsExpected]
}

export const purchasesExpected = {
  viewer: {
    me: {
      purchases: [purchaseMock, purchaseMock]
    }
  }
}

export const purchasesQueryTest = {
  id: 'Purchases Query Test',
  query: `
    query {
      viewer {
        me {
          purchases {
            id
            amount
            items {
              id
              name
              description
              price
            }
          }
        }
      }
    }
  `,
  variables: {},
  context: {
    headers: {
      Authorization: 'Bearer bigboi'
    }
  },
  expected: {
    data: {
      ...purchasesExpected
    }
  }
};

