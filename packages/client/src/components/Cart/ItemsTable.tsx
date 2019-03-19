import React from 'react';
import { Table, Row, Col, Button } from 'antd'

import { ItemQuantity, RemoveIcon, Loader } from 'components/'
import { clearCart, currentCart, cartDefault } from 'store/';
import { Mutation, Query } from 'react-apollo';

export interface ItemsTableProps {
  hideHeadings?: boolean;
  style?: { [key: string]: string }
  titles?: boolean;
  footer?: boolean;
}

function CartFooter() {
  return (
    <Query query={currentCart}>
      {({ data: { cart = cartDefault }, loading }) => {
        if (loading) {
          return <Loader />
        }
        return (
          <Mutation mutation={clearCart}>
            {clearCart => {
              return (
                <Row>
                  <Col span={9} push={18}>
                    <h4>Total: ${`${cart.totalPrice}`}</h4>
                    <Button
                      type="ghost"
                      onClick={() => {
                        clearCart()
                      }}
                    >
                      <a > Clear Cart</a>
                    </Button>
                  </Col>
                </Row>
              )
            }}
          </Mutation>
        )
      }}
    </Query>

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
            footer={() => props.footer ? <CartFooter /> : null}
          />
        )
      }}
    </Query>
  )
}


export { ItemsTable }