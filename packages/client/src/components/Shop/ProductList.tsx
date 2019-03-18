import React from 'react';
import { Row } from 'antd';
import { ProductCard, Loader } from 'components/';
import { ListProps, ProductData } from 'types/';

function ProductList({ products = [] }: ListProps) {
  if (!products) {
    return <Loader />
  }
  return (
    <Row style={{ margin: 'auto 3.75rem' }}>
      <span>
        {products.map((item, index) => (
          <ProductCard
            key={item.id}
            data={item}
            index={index}
            viewPage={(product: ProductData) => null}
          />
        ))}
      </span>
    </Row>
  )
}

export { ProductList }