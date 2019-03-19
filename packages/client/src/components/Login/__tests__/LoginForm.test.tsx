import React from 'react';
import { InMemoryCache } from 'apollo-boost';
import wait from 'waait';

import { LoginForm } from 'components/';
import { mockApollo, loginMock } from 'test-utils';

const original = console.error

describe('LoginForm', () => {
  beforeAll(() => console.error = () => '')
  afterAll(() => { console.error = original })

  const component = mockApollo(<LoginForm />, {
    mocks: [loginMock],
    cache: new InMemoryCache()
  });

  it('renders login', async () => {
    await wait(0)
    expect(component.toJSON()).toMatchSnapshot();
  })

  it('sets inputs', async () => {
    await wait(0)

    const email = component.root.find(el => el.props.name === 'email')
    const password = component.root.find(el => el.props.name === 'password')

    email.props.onChange({ target: { value: 'coffeecustomer@gmail.com' } });
    expect(email.props.value).toBe('coffeecustomer@gmail.com');

    password.props.onChange({ target: { value: 'test' } });
    expect(password.props.value).toBe('test')
  })
})
