import React, { Suspense } from 'react';
import { Alert } from 'antd';
import { Query } from 'react-apollo';

import { AccountsContainer, Loader, BcContainer } from 'components/';
import { currentUser } from 'store/';



function AccountsPage() {
  return (
    <Query query={currentUser} >
      {({ data, loading }) => {
        if (loading || !data) {
          return <Loader />
        }

        if (!loading && data && data.currentUser.isLoggedIn) {
          return (
            <Suspense fallback={<Loader />}>
              <AccountsContainer user={data.currentUser} />
            </Suspense>
          )
        }

        return (
          <BcContainer>
            <Alert
              type="warning"
              message="Please Log In to View Your Account"
            />
          </BcContainer>
        )
      }}
    </Query>
  )
}


export { AccountsPage }
