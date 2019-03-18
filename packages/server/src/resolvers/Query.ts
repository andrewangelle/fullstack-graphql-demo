import { QueryResolvers } from "../generated/graphqlgen";

import { getUserId } from "utils/";
import { Context } from "resolvers/";


export interface QueryParent { }

export const Query: QueryResolvers.Type = {
  ...QueryResolvers.defaultResolvers,
  viewer: () => {
    return {
      me: null,
      cart: null
    }
  },
  cart: async (parent, args, context: Context, info) => {
    try {
      const id = getUserId(context)
      const cart = await context.db.carts({ where: { user: { id } } })[0] || {}
      return cart
    } catch {
      console.debug('Trouble getting cart')
      return {
        itemCount: 0,
        totalPrice: '0',
        items: []
      } as any
    }
  },
  feed: async (parent, args, context: Context, info) => {
    try {
      const products = await context.db.products({ first: 50 }).then(res => res)
      return products || []

    } catch (err) {
      console.debug('trouble getting feed', err.message)
      return []
    }
  },
};
