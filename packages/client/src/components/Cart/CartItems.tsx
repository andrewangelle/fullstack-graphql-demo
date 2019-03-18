import React from 'react';
import { Query } from 'react-apollo';

import { ItemsTable, Loader } from 'components/';
import { currentCart } from 'store/';


function CartItems(props: any) {
  return (
    <Query query={currentCart}>
      {({ data, loading }) => {
        if (loading || !data) {
          return <Loader />
        }
        return (
          <div style={{ minHeight: 'auto' }}>
            <ItemsTable
              items={data.cart.items}
              total={data.cart.totalPrice}
              {...props}
            />
          </div>
        )
      }}
    </Query>

  )
}

export { CartItems }