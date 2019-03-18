import React from 'react';
import { Query } from 'react-apollo';
import { Row } from 'antd';

import { BcContainer, ProductList, Loader } from 'components/';
import { feed } from 'store/';

function ShopContainer() {
  return (
    <Query query={feed}>
      {({ data, loading }) => {
        if (loading) {
          return <Loader />
        }
        return (
          <ProductList products={data && data.feed || []} />
        )
      }}
    </Query>
  )
}

function ShopPage() {
  return (
    <BcContainer>
      <Row style={{ margin: 'auto 3.75rem' }}>
        <ShopContainer />
      </Row>
    </BcContainer>
  )
}

export { ShopPage }