import 'babel-polyfill'
import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
  mockServer
} from 'graphql-tools';
import { graphql } from 'graphql';

import {
  productsQueryTest,
  purchasesQueryTest,
  typeDefsMock as typeDefs
} from './mocks'


/** setup */
const cases = [productsQueryTest, purchasesQueryTest];
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


/** tests */
describe('Schema', () => {
  it('has valid type definitions', async () => {
    expect(async () => {
      const MockServer = mockServer(typeDefs, {});
      await MockServer.query(`{ __schema { types { name } } }`);
    }).not.toThrow();
  });

  it('Feed Query', async () => {
    const { query, variables, context: ctx, expected } = cases[0] as any
    const testQuery = await graphql(mockSchema, query, null, { ctx }, variables);

    expect(testQuery).toMatchObject(expected)
  });

  it('Purchases Query', async () => {
    const { query, variables, context: ctx, expected } = cases[1] as any
    const testQuery = await graphql(mockSchema, query, null, { ctx }, variables);

    expect(testQuery).toMatchObject(expected)
  });
});