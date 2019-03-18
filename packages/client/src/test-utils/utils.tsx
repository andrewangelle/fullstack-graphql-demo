import React from 'react';
import { create } from 'react-test-renderer';
// adds custom jest matchers from jest-dom
import 'jest-dom/extend-expect';
import { MockedProvider } from 'react-apollo/test-utils';

const mockApollo = (
  node: any,
  { mocks, addTypename, defaultOptions, cache, ...options }: any = {},
) => {
  return create(
    <MockedProvider
      mocks={mocks}
      addTypename={addTypename}
      defaultOptions={defaultOptions}
      cache={cache}
    >
      {node}
    </MockedProvider>,
    options,
  );
};

export * from 'react-test-renderer';
export { mockApollo };