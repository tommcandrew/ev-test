import express from "express";
import mongoose from "mongoose";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./typeDefs.js";
import resolvers from "./resolvers.js";

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  const app = express();
  server.applyMiddleware({ app });
  mongoose.connect("mongodb://localhost:27017/client-list");
  app.listen(3001, () => console.log("Server started on port 3001"));
};

startServer();
