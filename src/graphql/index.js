import { ApolloServer } from "apollo-server-express";

import UserAPI from "./datasources/users";
import { resolvers, typeDefs } from "./schema";

export const dataSources = () => ({
  userAPI: new UserAPI(),
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
});

export default server;
