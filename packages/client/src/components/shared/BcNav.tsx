import React from 'react';
import { Mutation, Query } from 'react-apollo';
import { Layout, Menu, Icon } from 'antd';
import { Link, navigate } from '@reach/router';

import { navMenu, Loader } from 'components/';
import { logoutUser, currentCart, clearCart } from 'store/';
import { CurrentUser } from 'types/';
import { useBreakpoint } from 'utils/';

const { Header } = Layout;

export type NavArgs = {
  [key: string]: any
  cartOpen: boolean;
  toggleCart: () => void;
  user: CurrentUser;
}


function BcNav({ cartOpen, toggleCart, user, ...props }: NavArgs) {
  const screenSize = useBreakpoint();
  const mobile = screenSize === 'sm' || screenSize === 'xs';
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
                  <Menu
                    theme="light"
                    mode="horizontal"
                    defaultSelectedKeys={[props.location]}
                    style={navMenu}
                    onClick={() => cartOpen && toggleCart()}
                  >
                    <Menu.Item key="/">
                      <Link to="/">
                        {!mobile && <span>Home</span>}
                        {mobile && <Icon type='home' />}
                      </Link>
                    </Menu.Item>

                    <Menu.Item key="/shop">
                      <Link to="/shop">
                        {!mobile && <span>Shop</span>}
                        {mobile && <Icon type='shop' />}                        </Link>
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
                      {!mobile && <span>{user.isLoggedIn ? 'Sign Out' : 'Sign In'}</span>}
                      {mobile && user.isLoggedIn && <Icon type='logout' />}
                      {mobile && !user.isLoggedIn && <Icon type='logout' />}
                    </Menu.Item>

                    <Menu.Item key="/account">
                      <Link to="/account">
                        {!mobile && <span>Account</span>}
                        {mobile && <Icon type='profile' />}
                      </Link>
                    </Menu.Item>

                    <Menu.Item
                      key="/cart"
                      onClick={toggleCart}
                    >
                      {!mobile && <span>Cart {`(${data.cart.itemCount})`}</span>}

                      <Icon type="shopping-cart" />
                      {mobile && `(${data.cart.itemCount})`}
                    </Menu.Item>
                  </Menu>
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