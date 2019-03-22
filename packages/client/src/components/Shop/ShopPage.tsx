import React from 'react';
import { Query } from 'react-apollo';
import { Row } from 'antd';

import { BcContainer, ProductList, Loader } from 'components/';
import { feed } from 'store/';

function ShopPage() {
  return (
    <Query query={feed}>
      {({ data: { feed = [] }, loading }) => {
        if (loading) {
          return <Loader />
        }
        return (
          <BcContainer>
            <ProductList products={feed} />
          </BcContainer>
        )
      }}
    </Query>
  )
}

export { ShopPage }