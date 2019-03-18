import { ViewerResolvers } from "../generated/graphqlgen";

import {
  UserParent,
  InvoiceParent,
  ProductParent,
  CartParent,
  Context
} from "resolvers/";
import { getUserId } from "utils/";


export interface ViewerParent {
  me: UserParent;
  cart: CartParent;
  purchases: InvoiceParent[];
  sales: InvoiceParent[];
  products: ProductParent[];
}


export const Viewer: ViewerResolvers.Type = {
  ...ViewerResolvers.defaultResolvers,
  me: async (_parent, _args, context: Context, info) => {
    const id = getUserId(context);
    const me = await context.db.user({ id });
    return me
  },
  cart: async (parent, args, context: Context) => {
    try {
      const id = getUserId(context)
      const me = await context.db.carts({ where: { user: { id } } })
      return me[0] as any
    }
    catch {
      console.log('Viewer.cart error')
    }
  },
};
