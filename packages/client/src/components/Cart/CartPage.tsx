import React, { ReactElement, Suspense } from 'react';
import { Query } from 'react-apollo';
import { Layout, Button } from 'antd';
import { navigate } from '@reach/router';

import { CartItems, Loader, } from 'components/'
import { currentCart } from 'store/'

const { Sider, Header, Content } = Layout;

interface CartPageProps {
  readonly toggleCart: () => void;
}

function CartPage(props: CartPageProps): ReactElement<CartPageProps> {
  return (
    <Query query={currentCart}>
      {({ data, loading }) => {
        if (loading || !data) {
          return <Loader />
        }
        return (
          <Layout>
            <Suspense fallback={<Loader />}>

              <Content>
                <CartItems footer={true} {...data.cart} />
              </Content>

              <Sider theme="dark">
                <Header style={{ textAlign: 'center' }}>
                  <h4 style={{ color: 'white' }}>
                    Total: ${data.cart.totalPrice}
                  </h4>

                  <Button
                    type="default"
                    onClick={() => {
                      props.toggleCart();
                      navigate('/checkout')
                    }}
                  >
                    Checkout
                  </Button>
                </Header>
              </Sider>

            </Suspense>
          </Layout>
        )
      }}
    </Query>
  )
}

export { CartPage }
