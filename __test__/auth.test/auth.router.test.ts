import request from "supertest";
const { setupDB } = require("../bdd-test.setup");
import app from "../../src/app";
import { UserModel } from "../../src/module/user/user.database/user.database.model";
import { users } from "../fixture/user.fixture";
import {
  generateToken,
  hashPassword,
} from "../../src/module/auth/auth.service";
import * as dotenv from "dotenv";

dotenv.config();
const user = users[0];

describe("User:router", () => {
  setupDB("test-auth-bdd");

  beforeAll(async () => {
    const hashedPassword = await hashPassword(user.password);
    await UserModel.insertMany([{ ...user, password: hashedPassword }]);
  });

  afterAll(async () => {
    await UserModel.remove({});
  });

  describe("Auth:Login", () => {
    test("Login : Success", async () => {
      const response = await request(app)
        .post("/auth/login")
        .send({ username: user.name, password: user.password });
      expect(response.status).toBe(200);
      expect(response.body.token).toBeDefined();
      expect(`${response.body.user_id}`).toStrictEqual(`${user._id}`);
    });

    test("Login : Failure", async () => {
      const user = users[0];
      const response = await request(app)
        .post("/auth/login")
        .send({ username: user.name, password: "pip" });
      expect(response.status).toBe(403);
    });
  });
});
