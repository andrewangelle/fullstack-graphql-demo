import React from 'react';
import { Card } from 'antd';

import { BcContainer } from 'components/';

function ProductPage(props: any) {
  return (
    <BcContainer>
      <Card>
        <Card type="inner">
          Product Page
        </Card>
      </Card>
    </BcContainer>
  )
}

export { ProductPage }