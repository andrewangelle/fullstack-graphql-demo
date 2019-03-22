import React from 'react';
import { Mutation, Query } from 'react-apollo';
import { navigate } from '@reach/router';
import { Table, Row, Col, Button } from 'antd'

import { ItemQuantity, RemoveIcon, Loader } from 'components/'
import { clearCart, currentCart, cartDefault } from 'store/';


export interface ItemsTableProps {
  hideHeadings?: boolean;
  style?: { [key: string]: string }
  titles?: boolean;
  footer?: boolean;
}

export function CartPrice({ color }: { color?: string }) {
  return (
    <Query query={currentCart}>
      {({ data: { cart = cartDefault }, loading }) => {
        if (loading) {
          return <Loader />
        }
        return (
          <h4 style={{ color, textAlign: 'center' }}>
            Total: ${`${cart.totalPrice}`}
          </h4>
        )
      }}
    </Query>
  )
}

export function CheckoutButton({ toggleCart, style }: { toggleCart: () => void, style: any }) {
  return (
    <Button
      type="primary"
      style={style}
      onClick={() => {
        toggleCart();
        navigate('/checkout')
      }}
    >
      Checkout
    </Button>
  )
}

export function ClearCartButton(style: any) {
  return (
    <Mutation mutation={clearCart}>
      {clearCart =>
        <Button
          type="danger"
          style={style}
          onClick={() => clearCart()}
        >
          <a>Clear Cart</a>
        </Button>
      }
    </Mutation>
  )
}


function ItemsTable(props: ItemsTableProps) {

  // Pass as a prop to antd's Table for access to Col's render method
  const columns = [
    {
      title: `${props.hideHeadings ? '' : 'Name'}`,
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => record.name
    },
    {
      title: props.hideHeadings ? '' : 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (text, record) => (
        <ItemQuantity
          key={record.id || ''}
          quantity={record.quantity}
          product={record}
        />
      )
    },
    {
      title: props.hideHeadings ? '' : 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text, record) => (
        <span>
          <h3>
            {record.price || ''}
          </h3>
        </span>
      )
    },
    {
      title: props.hideHeadings ? '' : 'Remove',
      dataIndex: 'remove',
      key: 'remove',
      render: (text, record) => {
        return (
          <RemoveIcon
            key={record.id}
            product={record}
          />
        )
      }
    }
  ]


  return (
    <Query query={currentCart}>
      {({ data: { cart = cartDefault }, loading }) => {
        if (loading) {
          return <Loader />
        }
        return (
          <Table
            dataSource={cart.items || []}
            columns={columns}
            pagination={false}
            style={props.style}
          />
        )
      }}
    </Query>
  )
}


export { ItemsTable }