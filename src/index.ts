import schema from "./schema";
import { createConnection } from "typeorm";

import * as express from "express";
import { ApolloServer } from "apollo-server-express";

import expressPlayground from "graphql-playground-middleware-express";

const port = process.env.PORT || 4000;

const app = express();
const server = new ApolloServer({ schema, playground: true });

server.applyMiddleware({ app, path: "/graphql" });

app.get("/playground", expressPlayground({ endpoint: "/graphql" }));

createConnection().then(() => {
  app.listen({ port }, () => {
    console.log(`Apollo Server on http://localhost:${port}/graphql`);
  });
});
