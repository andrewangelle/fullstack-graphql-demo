import React from 'react';
import { Mutation, Query } from 'react-apollo';
import { Layout, Menu, Icon } from 'antd';
import { Link, navigate } from '@reach/router';

import { navMenu, Loader } from 'components/';
import { logoutUser, currentCart, clearCart } from 'store/';
import { CurrentUser } from 'types/';

const { Header } = Layout;

export type NavArgs = {
  [key: string]: any
  cartOpen: boolean;
  toggleCart: () => void;
  user: CurrentUser;
}

function BcNav({ cartOpen, toggleCart, user, ...props }: NavArgs) {
  return (
    <Query query={currentCart}>
      {({ data, loading }) => {
        if (loading || !data) {
          return <Loader />
        }
        return (
          <Mutation mutation={logoutUser}>
            {logoutUser => (
              <Mutation mutation={clearCart}>
                {clearCart =>
                  <Header style={{ background: 'transparent' }}>
                    <Menu
                      theme="light"
                      mode="horizontal"
                      defaultSelectedKeys={[props.location]}
                      style={navMenu}
                      onClick={() => cartOpen && toggleCart()}
                    >
                      <Menu.Item key="/">
                        <Link to="/">
                          <span>Home</span>
                        </Link>
                      </Menu.Item>

                      <Menu.Item key="/shop">
                        <Link to="/shop">
                          <span>Shop</span>
                        </Link>
                      </Menu.Item>

                      <Menu.Item
                        key="/login"
                        onClick={async () => {
                          try {
                            if (user.isLoggedIn) {
                              logoutUser()
                              clearCart()
                            } else {
                              navigate('/login')
                            }
                          } catch (err) {
                            console.log({ logoutErr: err.message })
                          }
                        }}
                      >
                        <span>{user.isLoggedIn ? 'Sign Out' : 'Sign In'}</span>
                      </Menu.Item>

                      <Menu.Item key="/account">
                        <Link to="/account">
                          <span>Account</span>
                        </Link>
                      </Menu.Item>

                      <Menu.Item
                        key="/cart"
                        onClick={toggleCart}
                      >
                        <span>Cart {`(${data.cart.itemCount})`}</span>
                        <Icon type="shopping-cart" />
                      </Menu.Item>
                    </Menu>
                  </Header>
                }
              </Mutation>
            )}
          </Mutation>
        )
      }}
    </Query>
  )
}



export { BcNav }