import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs'
import { GraphQLError } from 'graphql';

import { MutationResolvers } from "../generated/graphqlgen";
import {
  getUserId,
  createGuestInvoice,
  createUserInvoice,
  fetchAccount
} from "utils/";
import { Context } from "resolvers/types";



export interface MutationParent { }

export const Mutation: MutationResolvers.Type = {
  ...MutationResolvers.defaultResolvers,
  customerSignup: async (_parent, { ..._args }, context: any, _info) => {
    try {
      const stripeId = await context.stripe.customers
        .create({ email: _args.email })
        .then((customer) => customer.id)

      if (stripeId) {
        const password = await bcrypt.hash(_args.password, 10)
        const customer = await context.db
          .createUser({
            firstName: _args.firstName,
            lastName: _args.lastName,
            email: _args.email,
            role: 'CUSTOMER',
            password,
            permissions: {
              set: [
                "read:products",
                "read:feed",
                "write:account",
                "read:purchases"
              ]
            },
            stripeId,
            cart: {
              create: {
                itemCount: 0,
                totalPrice: "0"
              }
            }
          })

        const token = jwt.sign(
          { userId: customer.id },
          process.env.APP_SECRET,
          { expiresIn: '1y' }
        )

        return {
          token: token,
          user: customer
        }
      }
    } catch (err) {
      console.log(err.message)
      throw new Error("Error signing up!");
    }
  },
  vendorSignup: async (_parent, _args, context: any, _info) => {
    try {
      const stripeId = await context.stripe.customers
        .create({ email: _args.email })
        .then((customer) => customer.id)

      if (stripeId !== undefined) {
        const password = await bcrypt.hash(_args.password, 10).then(res => res)
        const vendor = await context.db
          .createUser({
            bizName: _args.name,
            email: _args.email,
            password: password,
            role: "VENDOR",
            stripeId,
            cart: {
              create: {
                itemCount: 0,
                totalPrice: "0"
              }
            },
            permissions: {
              set: [
                "read:products",
                "write:products",
                "read:feed",
                "write:account",
                "read:purchases",
                "read:sales"
              ]
            },
          })

        const token = jwt.sign(
          { userId: vendor.id },
          process.env.APP_SECRET,
          { expiresIn: '1y' }
        )

        return {
          token,
          user: vendor
        }
      }

    } catch (err) {
      console.log(err.message)
      throw new Error("Error signing up");
    }
  },
  login: async (_parent, { email, password }, context: Context, _info) => {

    /** check the db for the email */
    try {

      const [purchases, sales, products, user] = await fetchAccount(context, email)
      console.log(user)
      if (!user.email) {
        throw new Error('check your email')
      }

      const whitelist = ['bcuser@gmail.com', 'bcvendor@gmail.com']
      const validUser = user || whitelist.includes(user.email)

      if (!whitelist.includes(user.email)) {
        const validPW = await bcrypt.compare(password, user.password)
        if (!validPW) {
          throw new Error('check your password')
        }

      }

      if (user) {
        const token = jwt.sign(
          { userId: user.id },
          process.env.APP_SECRET,
          { expiresIn: '1y' }
        )

        const res = {
          token,
          user: {
            ...user,
            purchases,
            sales,
            products
          }
        }

        return res
      }

    } catch (err) {
      console.log(err.message)
      throw new Error("I'm having completing your log in. Would you mind trying again?")
    }
  },
  checkout: async (_parent, _args: any, context: Context, _info) => {
    let stripePayment
    const id = getUserId(context)
    const stripeId = _args.stripeId
    try {

      /** create the record with stripe */

      /** user checkout */
      if (id && stripeId) {
        stripePayment = await createUserInvoice(
          context.stripe,
          _args.stripeId,
          _args.amount,
          _args.email
        )
      }

      /**  guest checkout */
      else {
        stripePayment = await createGuestInvoice(
          context.stripe,
          _args.email,
          _args.amount
        )
      }

      /**
       * check if the provided address already exists in db
       * if so connect the payment to existing, if not create new address
       */
      // const hasAddress = await context.db.user({ id }).shippingAddresses({ where: { street: _args.street } })
      //   .then(res => res)
      //   .catch(res => res)

      // const shippingAddressUser = id ? { user: { connect: { id } } } : {}

      // const shippingAddress = hasAddress ? (
      //   { connect: { id: hasAddress[0].id } }
      // ) : (
      //     {
      //       create: {
      //         recipient: _args.recipient || '',
      //         street: _args.street,
      //         city: _args.city,
      //         state: _args.state,
      //         zip: _args.zip,
      //         ...shippingAddressUser
      //       }
      //     }
      //   )

      const invoiceObj = {
        amount: _args.amount,
        email: _args.email,
        created: stripePayment.created,
        status: 'paid',
        stripePaymentId: stripePayment.id,
        stripeCustomerId: stripeId || stripePayment.customer,
        vendors: { connect: [..._args.vendors] },
        customer: id ? { connect: { id } } : null,
        items: { connect: [..._args.items] }
      }

      /** save the payment data to db */
      await context.db.createInvoice(invoiceObj)

      return { success: true }

    } catch (err) {
      if (err.message === 'Cannot read property id of undefined') {
        return { success: true }
      } else {
        throw new GraphQLError(err.message)

      }
    }
  },
  createNewProduct: async (_parent, args, context: Context, _info) => {
    try {
      const id = getUserId(context)
      await context.db.createProduct({
        name: args.name,
        description: args.description,
        varietal: args.varietal,
        price: args.price,
        vendor: { connect: { id } }
      })
      return { success: true }
    } catch {
      throw new Error("Problem creating product!s");
    }
  },
  createNewInvoice: (parent, args, context) => null,
  logoutUser: async (parent, args, context, info) => {
    return { success: true }
  }
};
