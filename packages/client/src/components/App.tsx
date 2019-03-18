import React from 'react';
import { StripeProvider, Elements } from 'react-stripe-elements';

import {
  BcMenu,
  Routes,
} from 'components/'

const Stripe = StripeProvider as any

export function App(props: any) {
  return (
    <Stripe apiKey={process.env.REACT_APP_STRIPE_TOKEN}>
      <Elements>
        <BcMenu {...props}>
          <Routes {...props} />
        </BcMenu>
      </Elements>
    </Stripe>
  )
}
