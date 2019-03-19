import React from 'react';
import { InMemoryCache } from 'apollo-boost';
import wait from 'waait';

import { LandingPage } from 'components/';
import { mockApollo } from 'test-utils';

const original = console.error

describe('LandingPage', () => {
  beforeAll(() => console.error = () => '')
  afterAll(() => { console.error = original })

  const component = mockApollo(<LandingPage />, {
    mocks: [],
    cache: new InMemoryCache()
  });

  it('renders landing page', async () => {
    await wait(0)
    expect(component.toJSON()).toMatchSnapshot();
  })
})
