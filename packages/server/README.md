### Server
  [![CircleCI](https://circleci.com/gh/begincoffees/bcapi.svg?style=shield)](https://circleci.com/gh/begincoffees/bcclient)
  [![Uptime Robot status](https://img.shields.io/uptimerobot/status/m779426128-6b6e81ed8dc987db17d4cad2.svg)](https://stats.uptimerobot.com/nzx9jsLDw)
Back end services for bcweb.me

#### Description
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


#### Server Development

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
