import React, { useState, useCallback } from 'react';
import { Mutation } from 'react-apollo';
import { Table, Collapse, Layout, Button, Form, Input, Card } from 'antd';

import { lightBlue, formItemLayout } from 'components/constants';
import { addProduct } from 'store/';
import { ProductData } from 'types/';
import { Uuid } from 'utils/';


export const labels = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description'
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Varietal',
    dataIndex: 'varietal',
    key: 'varietal',
  }
]


interface SubmitArgs {
  product: any;
  toggleUI: () => void;
}

function SubmitButton({ product, toggleUI }: SubmitArgs) {
  return (
    <Mutation mutation={addProduct} variables={product}>
      {(submitNewProduct, { data }) => {
        return (
          <Button
            type="primary"
            onClick={() => {
              submitNewProduct();
              toggleUI();
            }}
            style={{ margin: 'auto 25%' }}
          >
            Add To Inventory
          </Button>
        )
      }}
    </Mutation>
  )
}

function InventoryList(props: any) {
  const key = new Uuid()

  /** state */
  const [isCollapsed, setCollapsed] = useState(true)
  const [tableView, viewTable] = useState(true)
  const [addView, viewAdd] = useState(false)
  const [product, updateProduct] = useState({
    name: '',
    price: '',
    description: '',
    varietal: ''
  })


  /** methods */
  const updateProductForm = useCallback((key, nextState, prevState) => {
    updateProduct({
      ...prevState,
      [key]: nextState
    })
  }, [updateProduct])

  const toggleUI = useCallback(() => {
    viewTable(true)
    viewAdd(false)
  }, [viewTable])

  /** render */
  return (
    <Collapse bordered={true}>
      <Collapse.Panel
        key={`${key}`}
        header={(
          <h4 style={lightBlue}>
            Current Inventory
          </h4>
        )}
      >
        <Layout onMouseLeave={() => setCollapsed(true)}>
          <Layout.Sider
            theme="dark"
            width="9rem"
            collapsed={isCollapsed}
            collapsedWidth=""
          >
            {!isCollapsed &&
              <>
                <Button
                  type="default"
                  style={{ margin: '1rem' }}
                  disabled={addView}
                  onClick={() => {
                    viewTable(false)
                    viewAdd(true)
                  }}
                >
                  Add Product
                </Button>

                {addView &&
                  <Button
                    type="default"
                    style={{ margin: '1rem 25%' }}
                    onClick={() => {
                      viewTable(true)
                      viewAdd(false)
                    }}
                  >
                    Back
                  </Button>}
              </>}
          </Layout.Sider>

          <Layout.Content onMouseEnter={() => setCollapsed(false)}>
            {tableView &&
              <Table
                columns={labels}
                dataSource={props.products}
                rowKey={(record: ProductData, text) => record.id}
              />
            }

            {addView &&
              <Card>
                <Card type="inner">
                  <Form.Item {...formItemLayout}>
                    <Input
                      onInput={(e) => updateProductForm('name', e.currentTarget.value, product)}
                      placeholder="name"
                    />
                  </Form.Item>

                  <Form.Item {...formItemLayout}>
                    <Input
                      onInput={(e) => updateProductForm('description', e.currentTarget.value, product)}
                      placeholder="description"
                    />
                  </Form.Item>

                  <Form.Item {...formItemLayout} >
                    <Input
                      onInput={(e) => updateProductForm('price', e.currentTarget.value, product)}
                      placeholder="price"
                    />
                  </Form.Item>

                  <Form.Item {...formItemLayout}>
                    <Input
                      onInput={(e) => updateProductForm('varietal', e.currentTarget.value, product)}
                      placeholder="varietal"
                    />
                  </Form.Item>
                  <SubmitButton product={product} toggleUI={toggleUI} />
                </Card>
              </Card>
            }
          </Layout.Content>
        </Layout>
      </Collapse.Panel>
    </Collapse>
  )
}

export { InventoryList }