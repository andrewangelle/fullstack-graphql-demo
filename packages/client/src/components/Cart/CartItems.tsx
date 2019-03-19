import React from 'react';
import { Query } from 'react-apollo';

import { ItemsTable, Loader } from 'components/';
import { currentCart, cartDefault } from 'store/';


function CartItems(props: any) {
  return (
    <Query query={currentCart}>
      {({ data: { cart = cartDefault }, loading }) => {
        if (loading) {
          return <Loader />
        }
        return (
          <div style={{ minHeight: 'auto' }}>
            <ItemsTable
              items={cart.items}
              total={cart.totalPrice}
              {...props}
            />
          </div>
        )
      }}
    </Query>

  )
}

export { CartItems }