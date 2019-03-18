
import { UserParent } from "resolvers/";
import { AuthPayloadResolvers } from "../generated/graphqlgen";

export interface AuthPayloadParent {
  token?: string;
  user?: UserParent;
}

export const AuthPayload: AuthPayloadResolvers.Type = {
  token: parent => parent.token,
  user: parent => parent.user
};
