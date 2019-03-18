import React, { useState } from 'react';
import { ApolloConsumer } from 'react-apollo';
import { InputNumber, Button } from 'antd'

import { pointer, spacer, flex } from 'components/constants';
import { updateCartItemQuantity } from 'store/';
import { withZeroBase } from 'utils/';

function ItemQuantity(props: any) {
  return (
    <ApolloConsumer>
      {client => <Quantity client={client} {...props} />}
    </ApolloConsumer>
  )
}

function Quantity(props: any) {
  const { product, quantity } = props;
  const [isEditing, setEditing] = useState(false);
  const [isHovering, setHovering] = useState(false);

  const quantityValue = withZeroBase(quantity)
  return (
    <div
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onBlur={() => isEditing ? setEditing(false) : ''}
      style={isHovering ? pointer : {}}
      tabIndex={-1}
    >
      {isEditing &&
        <InputNumber
          value={quantityValue}
          onChange={(value) => {
            props.client.mutate({
              mutation: updateCartItemQuantity,
              variables: {
                item: {
                  product: { ...product, quantity: withZeroBase(value as number) }
                }
              }
            })
          }}
          onBlur={() => {
            setHovering(false)
            setEditing(false)
          }}
          tabIndex={0}
        />
      }

      {!isEditing &&
        <div style={flex} onFocus={() => setHovering(true)}>
          <span style={spacer}>
            {props.quantity}
          </span>

          {isHovering &&
            <Button
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setEditing(true)
                }
              }}
              onClick={() => {
                setEditing(true)
                setHovering(false)
              }}
              style={{ ...pointer, ...spacer }}
            >
              Edit
            </Button>
          }
        </div>
      }
    </div>
  )
}

export { ItemQuantity }