import React, { useEffect } from 'react';
import { Button, message } from 'antd';
import { Mutation } from 'react-apollo';

import { addCartItem } from 'store/';


export function AddItemButton(item: any) {
  useEffect(() => {
    setTimeout(() => message.destroy(), 1700)
    return () => {
      clearTimeout(1700)
    }
  }, [])
  return (
    <Mutation mutation={addCartItem} variables={{ item }}>
      {addCartItem =>
        <Button
          type="default"
          onClick={() => {
            addCartItem(item)
            message.success('Added to Cart')
          }}
        >
          Add to Cart
        </Button>
      }
    </Mutation>
  )
}
