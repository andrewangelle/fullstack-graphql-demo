
import { Resolvers } from "../generated/graphqlgen";
import {
  Query,
  Viewer,
  User,
  Cart,
  Product,
  Invoice,
  PaymentRecord,
  Mutation,
  AuthPayload,
  MutationResult,
  ShippingAddress
} from 'resolvers/';


export const resolvers: Resolvers = {
  Query,
  Viewer,
  User,
  Cart,
  Product,
  Invoice,
  PaymentRecord,
  Mutation,
  AuthPayload,
  MutationResult,
  ShippingAddress
};