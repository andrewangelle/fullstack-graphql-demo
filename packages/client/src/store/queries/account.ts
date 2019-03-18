import gql from 'graphql-tag'

export const productsQuery = gql`
  query {
    viewer {
      me {
        products {
          id
          name
          price
          description
          varietal
        }
      }
    }
  }
`

export const purchasesQuery = gql`
  query {
    viewer {
      me {
        purchases {
          id
          amount
          createdAt
          items {
            name
            price
          }
        }
      }
    }
  }
`

export const salesQuery = gql`
  query {
    viewer {
      me {
        sales {
          id
          amount
          email
          createdAt
          items {
            id
          }
        }
      }
    }
  }
`
export const addProduct = gql`
  mutation(
    $name: String!
    $varietal: String!
    $price: String!,
    $description: String!
  ){
    createNewProduct (
      name: $name
      varietal: $varietal
      price: $price
      description: $description
    ) {
      success
    }
  }
`


export const accountQuery = gql`
  query{
    viewer {
      me {
        id
        role
        firstName
        lastName
        bizName
        stripeId
        products {
          id
          name
          price
          description
          varietal
        }
        purchases {
          id
          amount
          createdAt
          items {
            name
            price
          }
          shippingAddress {
            id
            zip
          }
        }
        sales {
          id
          amount
          email
          createdAt
          items {
            id
          }
        }
      }
    }
  }
`