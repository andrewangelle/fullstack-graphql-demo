## Fullstack GraphQL Demo
  [![CircleCI](https://circleci.com/gh/begincoffees/bcclient/tree/master.svg?style=svg)](https://circleci.com/gh/begincoffees/bcclient/tree/master)
  [![Uptime Robot status](https://img.shields.io/uptimerobot/status/m779426128-6b6e81ed8dc987db17d4cad2.svg)](https://stats.uptimerobot.com/nzx9jsLDw)
  <!-- [![Slack](https://img.shields.io/badge/slack-@amadev-yellow.svg?logo=slack)](https://amadev.slack.com/messages/CD6TEUCQP/) -->

An full-stack demo for an e-commerce web-app.

### Project Setup

You'll need a copy of the .env

Clone the repo:

```sh
$ git clone https://github.com/andrewangelle/fullstack-graphql-demo.git
```

Build the project and dependencies:

```sh
$ npx lerna bootstrap
```

Run the project:

```sh
$ npx lerna run start
```

client will be running on http://localhost:3000

a graphql playground for the server will be running on http://localhost:6006

### Development - UI

Built with react and typescript and uses Apollo to integrate a graphql client

#### Tech Stack
* [react (v16.8.4)](https://facebook.github.io/react/) - View layer
* [apollo-client (v2.5.1)](https://www.apollographql.com/docs/react/) - GraphQL client and react integration
* [reach-router (v1.1.0)](https://reach.tech/router) - Client side Routing
* [antd (v3.11.6)](https://ant.design/) - React Component Library
* [babel (v7)](https://babeljs.io/) - ES6/JSX compiler
* [webpack (v4)](https://webpack.github.io/) - Module bundler
* [jest](https://facebook.github.io/jest/) - Test suite
* [react-stripe-elements (v2.0.1)](https://github.com/stripe/react-stripe-elements) - Handles client side tokenization and payment authorizations via stripe.
* [typescript (v3.3.3)](https://www.typescriptlang.org/)

#### Commands

Run tests:

```sh
$ cd packages/client && npm run test
```

Start dev server with HMR:

```sh
$ cd packages/client && npm start
```

Run production grade build:

```sh
$ cd packages/client && npm run build
```

Open up the app at http://localhost:3000

### Development - Server

A graphql server built with Graphql, Apollo and Typescript.
It features PostgresDB implemented with Prisma


#### Tech Stack
* [graphql-yoga (v2)](https://www.apollographql.com/) - An opinionated graphql server built on apollo-server and express
* [babel (v7)](https://babeljs.io/) - ES6/JSX compiler
* [jest](https://facebook.github.io/jest/) - Test suite
* [stripe (v2.0.1)](https://github.com/stripe/stripe-node) - Payment Authorization and Subscriptions
* [typescript (v2.9.2)](https://www.typescriptlang.org/)
* [prisma (v1.1.2)](https://github.com/prisma/)
* [prisma-client](https://github.com/prisma/prisma-client)
* [graphqlgen](https://github.com/prisma/graphqlgen)


#### Server Commands

You'll need a copy of the .env

Run the server
```sh
$ cd packages/server && npm start
```

Run tests
```sh
$ cd packages/server && npm run test
```

Open up graphql playground at http://localhost:6006
