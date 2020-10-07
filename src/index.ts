/*
Author: chankruze (chankruze@geekofia.in)
Created: Thu Oct 08 2020 04:05:20 GMT+0530 (India Standard Time)

Copyright (c) Geekofia 2020 and beyond
*/

import "reflect-metadata";
import { config } from "dotenv";
import { ApolloServer } from "apollo-server-express";
import * as Express from "express";
import { buildSchema, Query, Resolver } from "type-graphql";

// add .env variables to process
config();

// resolver
@Resolver()
class HelloResolver {
  // @Querry(() => type, { config })
  @Query(() => String, {
    name: "helloWorld",
    description: "Just a demo",
    nullable: true,
  })
  async hello() {
    return "Hello World!";
  }
}

// main function (entry fn)
const main = async () => {
  // build schema
  const schema = await buildSchema({
    resolvers: [HelloResolver],
  });
  // create apollo server
  const apolloServer = new ApolloServer({ schema });
  // init express app
  const app = Express();
  // apply express app to apollo server
  apolloServer.applyMiddleware({ app });
  // start listening
  app.listen(process.env.PORT, () => {
    console.log("[I] server started on http://localhost:5010/graphql");
  });
};

// call main
main();
