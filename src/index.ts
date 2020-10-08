/*
Author: chankruze (chankruze@geekofia.in)
Created: Thu Oct 08 2020 04:05:20 GMT+0530 (India Standard Time)

Copyright (c) Geekofia 2020 and beyond
*/

import "reflect-metadata";
import { config } from "dotenv";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { RegisterResolver } from "./modules/user/Register";

// add .env variables to process
config();

// main function (entry fn)
const main = async () => {
  // create connection
  await createConnection();

  // build schema
  const schema = await buildSchema({
    resolvers: [RegisterResolver],
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
