import gql from 'graphql-tag';


export const loginUser = gql`
  mutation($email: String!, $password: String!){
    loginUser(email: $email, password: $password) @client
  }
`
export const auth = gql`
  mutation($email: String!, $password: String!){
    login(email: $email, password: $password){
      token
      user {
        id
        email
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


export const logoutUser = gql`
  mutation {
    logoutUser @client
  }
`

