import { ApolloClient, NormalizedCacheObject } from 'apollo-boost';

import { currentUser, currentCart } from 'store/';
import { checkoutStepper } from './queries';

export const userDefault = {
  __typename: 'CurrentUser',
  id: '',
  email: '',
  role: '',
  token: '',
  isLoggedIn: false,
}

export const meDefault = {
  __typename: 'User',
  id: '',
  firstName: '',
  lastName: '',
  bizName: '',
  stripeId: '',
  role: '',
  purchases: [],
  sales: [],
  products: []
}

export const cartDefault = {
  __typename: 'Cart',
  itemCount: 0,
  totalPrice: 0,
  items: []
}

export const checkoutDefault = {
  __typename: 'Checkout',
  step: 0,
  done: false,
  items: false,
  payment: false,
  shipping: false,
  userAuthorized: false,
  token: ''
}

function setEmptyCache(client: ApolloClient<NormalizedCacheObject>) {
  const data = {
    currentUser: { ...userDefault },
    checkout: { ...checkoutDefault },
    cart: { ...cartDefault }
  }
  client.cache.writeData({ data });
}

async function setUserDefault(client: ApolloClient<NormalizedCacheObject>) {
  const token = localStorage.getItem('BC_AUTH')
  if (token) {
    const prevState: any = client.cache.readQuery({ query: currentUser });
    const data = {
      currentUser: {
        __typename: 'CurrentUser',
        ...prevState,
        id: prevState.currentUser.id,
        isLoggedIn: !!token,
        email: prevState.currentUser.email,
        token,
      }
    }
    await client.writeQuery({ query: currentUser, data })
  } else {
    const data = { currentUser: { ...userDefault } }
    await client.writeQuery({ query: currentUser, data });
  }
}

async function setCartDefault(client: ApolloClient<NormalizedCacheObject>) {
  const prevCart: { cart: any } | null = client.cache.readQuery({ query: currentCart });
  const data = prevCart ? ({
    cart: { ...prevCart.cart }
  }) : { cart: { ...cartDefault } }

  await client.writeQuery({ query: currentCart, data })
}

async function setCheckoutDefault(client: ApolloClient<NormalizedCacheObject>) {
  const prevCheckout: { checkout: any } | null = client.cache.readQuery({ query: checkoutStepper });
  const data = prevCheckout ? ({
    checkout: { ...prevCheckout.checkout }
  }) : { checkout: { ...checkoutDefault } }

  await client.writeQuery({ query: currentCart, data })
}

export async function setDefaults(client: ApolloClient<NormalizedCacheObject>) {
  const prevCache = localStorage.getItem('apollo-cache-persist');
  if (!prevCache) {
    setEmptyCache(client)
    return
  } else {
    await setUserDefault(client)
    await setCartDefault(client)
    await setCheckoutDefault(client)
  }

}
