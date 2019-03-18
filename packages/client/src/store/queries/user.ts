import gql from 'graphql-tag';


export const vendorSignup = gql`
  mutation($name: String! $email: String! $password: String!){
    vendorSignup ( name: $name email: $email password: $password ) {
      token
      user {
        id
      }
    }
  }
`

export const customerSignup = gql`
  mutation(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ){
    customerSignup (
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
       token
       user {
         id
       }
    }
  }`

export const currentUser = gql`{
  currentUser @client {
    isLoggedIn
    id
    email
    token
  }
}`


