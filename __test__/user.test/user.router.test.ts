import request from "supertest";
const { setupDB } = require("../bdd-test.setup");
import app from "../../src/app";
import { UserModel } from "../../src/module/user/user.database/user.database.model";
import { users } from "../fixture/user.fixture";
import { generateToken } from "../../src/module/auth/auth.service";
import * as dotenv from "dotenv";

dotenv.config();
const token = generateToken(users[0]._id);

describe("User:router", () => {
  setupDB("test-product-bdd");

  beforeAll(async () => {
    await UserModel.insertMany(users);
  });

  afterAll(async () => {
    await UserModel.remove({});
  });

  describe("Get:Users", () => {
    test("Get all Users", async () => {
      const response = await request(app)
        .get("/api/user")
        .set({ Authorization: `Bearer ${token}` });
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(users.length);
    });
  });
});
