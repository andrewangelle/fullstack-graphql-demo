import 'babel-polyfill'
import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
  mockServer
} from 'graphql-tools';
import { typeDefs } from '../generated/prisma-client/prisma-schema';
import { graphql } from 'graphql';

const productsExpected = {
  id: '1',
  name: 'A String',
  description: 'A String',
  price: 'A String'
}
const productsQueryTest = {
  id: 'Products Query Test',
  query: `
    query {
      products {
        id
        name
        description
        price
      }
    }
  `,
  variables: {},
  context: {},
  expected: {
    data: {
      products: [productsExpected, productsExpected]
    }
  }
};

describe('Schema', () => {
  const cases = [productsQueryTest];
  const mockSchema = makeExecutableSchema({ typeDefs });

  addMockFunctionsToSchema({
    schema: mockSchema,
    mocks: {
      Boolean: () => false,
      ID: () => '1',
      Int: () => 1,
      Float: () => 12.34,
      String: () => 'A String',
    }
  });

  it('has valid type definitions', async () => {
    expect(async () => {
      const MockServer = mockServer(typeDefs, {});
      await MockServer.query(`{ __schema { types { name } } }`);
    }).not.toThrow();
  });

  it('Products Query', async () => {
    const { query, variables, context: ctx, expected } = cases[0]
    const testQuery = await graphql(mockSchema, query, null, { ctx }, variables);

    expect(testQuery).toMatchObject(expected)
  });
});