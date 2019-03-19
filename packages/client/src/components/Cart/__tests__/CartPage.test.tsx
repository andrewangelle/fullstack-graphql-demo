import React from 'react';
import { InMemoryCache } from 'apollo-boost';
import wait from 'waait';

import { CartPage } from 'components/';
import { mockApollo, cartMock } from 'test-utils';

describe('CartPage', () => {
  it('renders cart page', async () => {
    const component = mockApollo(<CartPage toggleCart={() => null} />, {
      mocks: [cartMock],
      cache: new InMemoryCache()
    });
    await wait(0)
    expect(component.toJSON()).toMatchSnapshot()
  })
})
