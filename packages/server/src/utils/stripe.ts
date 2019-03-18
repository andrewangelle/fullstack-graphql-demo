import * as Stripe from 'stripe';

async function guestTransaction(
  stripe: Stripe,
  email: string,
  amount: number
) {
  const transaction = await stripe.customers.create({
    email,

    //attach payment source to customer
  }).then((customer) => {
    return stripe.customers.createSource(customer.id, {
      source: 'tok_visa'
    });

    // create payment object
  }).then((source) => {
    return stripe.charges.create({
      amount,
      currency: 'usd',
      customer: source.customer as any,
      receipt_email: email
    });
  })

  return transaction
}

async function userTransaction(
  stripe: Stripe,
  customerId: string,
  amount: number,
  email: string
) {
  const transaction = await stripe.customers.createSource(customerId, {
    source: 'tok_visa'
  })
    // create payment object
    .then((source) => {
      return stripe.charges.create({
        amount,
        currency: 'usd',
        customer: source.customer as any,
        receipt_email: email
      });
    })

  return transaction


}


const createUserInvoice = async (
  stripe: Stripe,
  customerId: string,
  amount: number,
  email: string
) => await userTransaction(stripe, customerId, amount, email)
  .then(res => res)
  .catch((err) => err)


const createGuestInvoice = async (
  stripe: Stripe,
  email: string,
  amount: number
) => await guestTransaction(stripe, email, amount)
  .then(res => res)
  .catch((err) => err)

export { createGuestInvoice, createUserInvoice }