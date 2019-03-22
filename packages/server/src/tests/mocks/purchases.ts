import { productsExpected } from "./";

export const purchaseQuery = `
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
`