import React, { useState } from 'react';
import { navigate } from '@reach/router';
import { Mutation, Query } from 'react-apollo';
import { Form, Button, Input } from 'antd'

import { Loader } from 'components/';
import {
  loginUser,
  clearCart,
  currentCart,
} from 'store/';



function LoginForm(props: any) {
  const [email, updateEmail] = useState('')
  const [password, updatePassword] = useState('')

  return (
    <Query query={currentCart}>
      {({ data, loading }) => {
        if (loading || !data) {
          return <Loader />
        }
        return (
          <Mutation mutation={loginUser} variables={{ email, password }}>
            {loginUser => (
              <Form>
                <Form.Item label="email">
                  <Input
                    name="email"
                    title="email"
                    onChange={(e) => updateEmail(e.target.value)}
                    value={email}
                  />
                </Form.Item>

                <Form.Item label="password">
                  <Input
                    onChange={(e) => updatePassword(e.target.value)}
                    value={password}
                    title="password"
                    name="password"
                  />
                </Form.Item>

                <Mutation mutation={clearCart}>
                  {clearCart =>
                    <Button
                      htmlType="button"
                      style={{ width: '50%', marginLeft: '25%', marginRight: '25%' }}
                      type="primary"
                      onClick={async () => {
                        try {
                          await loginUser();

                          if (data.cart.items.length) {
                            clearCart()
                          }
                          navigate('/')
                        } catch (err) {
                          console.log({ loginErr: err.message })
                        }
                      }}
                    >
                      Login
                    </Button>
                  }
                </Mutation>
              </Form>
            )}
          </Mutation>
        )
      }}
    </Query>
  )
}

export { LoginForm }
