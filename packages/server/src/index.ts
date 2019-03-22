export * from './resolvers';
export * from './tests';
export * from './utils';




import 'babel-polyfill';
import { GraphQLServer } from 'graphql-yoga'
import { makeExecutableSchema } from 'graphql-tools';
import * as Stripe from 'stripe';
import * as dotenv from 'dotenv';

import { Prisma } from './generated/prisma-client/'
import { typeDefs } from './generated/prisma-client/prisma-schema';
import { resolvers } from 'resolvers/';

dotenv.config()
const schema = makeExecutableSchema({ typeDefs })
const stripeApiKey = `${process.env.STRIPE_SECRET}`

const withDB = (req) => ({
  ...req,
  headers: {
    ...req.headers,
    Authorization: `Bearer ${process.env.PRISMA_TOKEN}`
  },

  db: new Prisma({
    schema,
    resolvers,
    endpoint: process.env.PRISMA_ENDPOINT,
    secret: process.env.PRISMA_SECRET
  } as any),

  stripe: new Stripe(stripeApiKey)
})


const server = new GraphQLServer({
  typeDefs: 'src/schema.graphql',
  resolvers,
  context: req => withDB(req)
})

const port = process.env.PORT || 6006
const options = {
  port,
  endpoint: '/bcgraph'
}

server.start(options).then(() => {
  console.log(`Server is up ${port}`)
});
