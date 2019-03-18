import React from 'react';
import { Query } from 'react-apollo';
import { Alert, Row } from 'antd';

import { BcContainer, Loader } from 'components/';
import { currentUser } from 'store/';

function LandingPage(props: any) {
  return (
    <Query query={currentUser}>
      {({ data, loading }) => {
        if (loading || !data) {
          return <Loader />
        }
        const user = data && data.currentUser
        return (
          <BcContainer>
            <Row style={{ margin: 'auto 3.75rem' }}>
              {user.isLoggedIn ? (
                <Alert
                  type="success"
                  message={`Welcome Back!`}
                  banner={true}
                  showIcon={false}
                />
              ) : (
                  <Alert
                    type="info"
                    message={`Begin Coffees coming soon ...`}
                    banner={true}
                    showIcon={false}
                  />)}
            </Row>
          </BcContainer>
        )
      }}
    </Query>
  )
}

export { LandingPage }