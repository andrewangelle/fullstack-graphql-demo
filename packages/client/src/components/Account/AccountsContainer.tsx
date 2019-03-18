import React from 'react';
import { Query } from 'react-apollo';

import {
  BcContainer,
  InventoryList,
  PurchaseList,
  SalesList,
  UserInfo,
  Loader,
} from 'components/';
import { accountQuery } from 'store/queries';
import { CurrentUser } from 'types/';

function AccountsContainer({ user }: { user: CurrentUser }) {
  return (
    <Query query={accountQuery}>
      {({ data, loading }) => {
        const isVendor = user.role === 'VENDOR';
        const account = data && data.viewer && data.viewer.me;
        if (loading || !data) {
          return <Loader />
        }
        return (
          <BcContainer margin="auto 3.5rem">
            <UserInfo me={user} />
            <SalesList isVendor={isVendor} sales={account.sales} />
            <InventoryList isVendor={isVendor} products={account.products} />
            <PurchaseList purchases={account.purchases} />
          </BcContainer>
        )
      }}
    </Query>
  )
}


export { AccountsContainer }