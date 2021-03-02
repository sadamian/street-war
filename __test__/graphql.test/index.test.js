import { ApolloServer } from "apollo-server-express";
import { createTestClient } from "apollo-server-testing";
import gql from "graphql-tag";
const { setupDB } = require("../bdd-test.setup");

import UserAPI from "../../src/graphql/datasources/users";
import { typeDefs, resolvers } from "../../src/graphql/schema";
import { UserModel } from "../../src/module/user/user.database/user.database.model";
import { users } from "../fixture/user.fixture";
import { IUser } from "../../src/module/user/user.interface";

const userAPI = new UserAPI();

// create a test server to test against, using our production typeDefs,
// resolvers, and dataSources.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({ userAPI }),
});
const { query } = createTestClient(server);

describe("GrapQL:Users", () => {
  setupDB("test-user-graphql-bdd");

  beforeAll(async () => {
    await UserModel.insertMany(users);
  });

  afterAll(async () => {
    await UserModel.remove({});
  });

  it("Users : Get only name", async () => {
    const GET_USERS = gql`
      query userList {
        users {
          name
        }
      }
    `;

    userAPI.getUsers = jest.fn(() => users.map((u) => ({ name: u.name })));
    const res = await query({ query: GET_USERS });
    expect(res).toMatchSnapshot();
  });

  it("Users : Get name and _id", async () => {
    const GET_USERS = gql`
      query userList {
        users {
          name
          _id
        }
      }
    `;
    userAPI.getUsers = jest.fn(() =>
      users.map((u) => ({ name: u.name, _id: u._id }))
    );
    const res = await query({ query: GET_USERS });
    expect(res).toMatchSnapshot();
  });
});
