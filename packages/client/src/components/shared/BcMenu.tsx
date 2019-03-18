import React, { useState } from 'react';
import { Layout } from 'antd';
import { Query } from 'react-apollo';

import {
  BcContainer,
  BcNav,
  CartPage,
  NavArgs,
  Loader
} from 'components/';
import { currentUser } from 'store/';

function BcMenu({ ...props }: NavArgs) {
  const [cartOpen, toggleCart] = useState(false)
  return (
    <Query query={currentUser}>
      {({ data, loading }) => {
        if (loading || !data) {
          return <Loader />
        }
        const user = data && data.currentUser
        return (
          <>
            <Layout style={{ background: 'transparent' }}>
              {cartOpen &&
                <BcContainer margin="0.5rem 5rem" padding="0rem">
                  <CartPage toggleCart={() => toggleCart(!cartOpen)} />
                </BcContainer>
              }

              <BcNav
                user={user}
                cartOpen={cartOpen}
                toggleCart={() => toggleCart(!cartOpen)}
              />
            </Layout>
            {props.children}
          </>
        )
      }}
    </Query>
  )
}

export { BcMenu }