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
import { useBreakpoint } from 'utils/';

function Responsive({ children }) {
  const breakpoint = useBreakpoint()
  switch (breakpoint) {
    case 'xl':
    case 'lg':
    case 'md':
      return (
        <BcContainer padding='0rem'>
          {children}
        </BcContainer>
      )
    case 'sm':
    case 'xs':
      return (
        <>{children}</>
      )
  }
}


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
            {cartOpen &&
              <Responsive>
                <CartPage toggleCart={() => toggleCart(!cartOpen)} />
              </Responsive>
            }

            <BcNav
              user={user}
              cartOpen={cartOpen}
              toggleCart={() => toggleCart(!cartOpen)}
            />
            {props.children}
          </>
        )
      }}
    </Query>
  )
}

export { BcMenu }