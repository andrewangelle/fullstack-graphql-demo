import { auth } from "store/queries";

export const loginResponse = {
  updatedAt: '2018-12-22T02:11:19.766Z',
  email: 'coffeecustomer@gmail.com',
  role: 'CUSTOMER',
  stripeId: 'cus_ECOkiVa9taKeLE',
  permissions:
    ['read:products',
      'read:feed',
      'write:account',
      'read:purchases'],
  bizName: null,
  lastName: 'Customer',
  firstName: 'Coffee',
  id: 'cjpytuypt00400926oadvdge1',
  createdAt: '2018-12-22T02:11:19.766Z',
  password: '$2a$10$FOBYMy73XxlwPd4Y/yKLSu/oS1NOL9tJbQbPSNSfjfSO8v/If7J9G'
}

export const loginMock = {
  request: {
    query: auth,
    variables: {
      email: 'coffeecustomer@gmail.com',
      password: 'test'
    }
  },
  response: { ...loginResponse }
}