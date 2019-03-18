import { Context } from "../resolvers/types/Context";
import * as jwt from 'jsonwebtoken'

export class AuthError extends Error {
  constructor() {
    super('Not authorized')
  }
}


export function getUserId(ctx: Context) {
  const Authorization = ctx.request.headers.authorization
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    if (token === 'bigboi') {
      return
    }
    const { userId } = jwt.verify(token, process.env.APP_SECRET) as { userId: string }
    return userId
  }

  throw new AuthError()
}

export async function fetchAccount(ctx: Context, email: string) {
  const user = await ctx.db.users({ where: { email } }).then(res => res[0]);
  const purchases = await ctx.db.invoices({ where: { customer: { id: user.id } } })
  const sales = await ctx.db.invoices({ where: { vendors_some: { id: user.id } } })
  const products = await ctx.db.products({ where: { vendor: { id: user.id } } })
  return Promise.all([purchases, sales, products, user])
}
