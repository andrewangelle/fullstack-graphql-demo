import React, { useMemo } from 'react';
import { Row, Col } from 'antd';

import { ProductCard, Loader } from 'components/';
import { useBreakpoint } from 'utils/layout';
import { ListProps, ProductData } from 'types/';

function useProductColSpan() {
  const size = useBreakpoint();
  console.log(size)
  switch (size) {
    case 'xl':
      return 6
    case 'lg':
      return 6
    case 'md':
      return 8
    case 'sm':
      return 12
    case 'xs':
      return 24
  }
}

export function ProductList({ products = [] }: ListProps) {
  const span = useProductColSpan();
  const memoized = useMemo(() => span, [span]);

  console.log(memoized)

  if (!products) {
    return <Loader />
  }

  return (
    <Row>
      {products.map((item, index) =>
        <Col key={item.id} span={memoized}>
          <ProductCard
            key={item.id}
            data={item}
            index={index}
            viewPage={(product: ProductData) => null}
          />
        </Col>
      )}
    </Row>
  )
}
