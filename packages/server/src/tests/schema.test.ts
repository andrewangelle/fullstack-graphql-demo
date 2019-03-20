import 'babel-polyfill'
import {
  makeExecutableSchema,
  mockServer
} from 'graphql-tools';

import {
  typeDefsMock as typeDefs,
  purchaseQuery,
  feedQuery
} from 'tests/mocks'


/** tests */
describe('Queries', () => {
  const mockSchema = makeExecutableSchema({ typeDefs });
  const server = mockServer(mockSchema, {
    Boolean: () => false,
    ID: () => 'af4ae2ad-0057-4d85-bfd5-aacc68326419',
    Int: () => 1,
    Float: () => 12.34,
    String: () => 'A String',
  });

  it('Feed Query', async () => {
    const test = await server.query(feedQuery);
    expect(test).toMatchSnapshot()
  });

  it('Purchases Query', async () => {
    const test = await server.query(purchaseQuery);
    expect(test).toMatchSnapshot()
  });

  it('Viewer Query', async () => {
    const test = await server.query(`query { viewer { me { id } } }`);
    expect(test).toMatchSnapshot()
  })
});

