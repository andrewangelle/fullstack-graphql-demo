export * from './Resolver'
export * from './accounts';
export * from './products'

type History = {
  push: Function;
}

interface RouteProps {
  match: object;
  location: object;
  history: History;
}

export interface AppProps extends RouteProps {
  client: ClientUI
}

export type ClientUI = {
  query: Function;
  mutate: Function;
}

export interface Account {
  role: string;
  stripeId: string;
  purchases: any[];
  sales: any[];
  products: any[];
}

export interface CurrentUser {
  id: string;
  email: string;
  token: string;
  isLoggedIn: boolean;
  role: string | null;
}

export interface AuthRes {
  token: String;
  user: CurrentUser & Account
}


export interface BaseProps {
  router: RouteProps;
  client: ClientUI;
  currentUser?: CurrentUser;
}

