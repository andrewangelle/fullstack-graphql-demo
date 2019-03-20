
export const feedQuery = `
  query {
    feed {
      id
      name
      description
      varietal
      price
      vendor {
        id
      }
    }
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

