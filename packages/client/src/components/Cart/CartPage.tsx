import React, { ReactElement } from 'react';
import { Layout } from 'antd';

import { CartItems, Loader, } from 'components/'
import { useBreakpoint } from 'utils/';
import { CheckoutButton, ClearCartButton, CartPrice } from './ItemsTable';

const { Sider, Header, Content, Footer } = Layout;

export function CartActions({ toggleCart }) {
  const breakpoint = useBreakpoint();
  switch (breakpoint) {
    case 'xl':
    case 'lg':
    case 'md':
      return (
        <Sider theme="dark">
          <Header style={{ textAlign: 'center' }}>
            <CartPrice color='white' />
          </Header>
          <Footer style={{ backgroundColor: '#001529', justifyContent: 'space-around' }}>
            <CheckoutButton toggleCart={toggleCart} style={{ margin: '0.25rem auto' }} />
            <ClearCartButton />
          </Footer>
        </Sider>
      )
    case 'sm':
    case 'xs':
      return (
        <>
          <CartPrice color='black' />
          <CheckoutButton toggleCart={toggleCart} style={{}} />
          <ClearCartButton />
        </>
      )
  }
}

export function CartPage({ toggleCart }) {
  return (
    <Layout>
      <Content>
        <CartItems />
      </Content>
      <CartActions toggleCart={toggleCart} />
    </Layout>
  )
}
