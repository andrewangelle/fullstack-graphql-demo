import React from 'react';
import { BcModal, RegisterForm } from 'components/';

function RegisterPage(props: any) {
  return (
    <BcModal
      {...props}
      title={'Create an Account'}
      component={() => <RegisterForm />}
    />
  )
}

export { RegisterPage }