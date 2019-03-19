import React from 'react';
import { Query } from 'react-apollo';
import { Alert, Row } from 'antd';

import { BcContainer, Loader } from 'components/';
import { currentUser, userDefault } from 'store/';

function LandingPage(props: any) {
  return (
    <Query query={currentUser}>
      {({ data: { currentUser: user = userDefault }, loading }) => {
        if (loading) {
          return <Loader />
        }
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