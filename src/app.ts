import express from "express";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import { ApolloServer } from "apollo-server-express";

import { mainRouter } from "./router";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/notFound.middleware";
import graphQLserver from "./graphql";

const app = express();

// App Config
app.use(helmet());
app.use(cors());
app.use(express.json());

// GraphQL (! Always before routing)
graphQLserver.applyMiddleware({ app });

// Routing
app.use("/", mainRouter);

// Need to be after routing declaration
// Error middleware
app.use(errorHandler);
app.use(notFoundHandler);

export default app;
