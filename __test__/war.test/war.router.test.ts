import request from "supertest";
const { setupDB } = require("../bdd-test.setup");
import app from "../../src/app";
import { UserModel } from "../../src/module/user/user.database/user.database.model";
import { adminUser, users } from "../fixture/user.fixture";
import { generateToken } from "../../src/module/auth/auth.service";
import * as dotenv from "dotenv";
import { WarModel } from "../../src/module/war/war.database/war.database.model";
import { ContractModel } from "../../src/module/contract/contract.database/contract.database.model";
import { IWar } from "../../src/module/war/war.interface";
import { war } from "../fixture/war.fixture";

dotenv.config();
const token = generateToken(adminUser._id);
const usertoken = generateToken(users[0]._id);
const warToCreate: { war_name: string } = { war_name: "waritos" };

describe("War:router", () => {
  setupDB("test-war-router-bdd");

  beforeAll(async () => {
    await UserModel.insertMany(users);
    await UserModel.insertMany([adminUser]);
    await WarModel.insertMany([war]);
  });

  afterAll(async () => {
    await WarModel.remove({});
    await ContractModel.remove({});
    await UserModel.remove({});
  });

  describe("Create:War", () => {
    test("Create war : Success", async () => {
      const response = await request(app)
        .post("/admin/war")
        .send(warToCreate)
        .set({ Authorization: `Bearer ${token}` });
      expect(response.status).toBe(201);
      expect(response.body.name).toBe(warToCreate.war_name);
      expect(response.body._id).toBeDefined();
    });

    test("Create war : Failure", async () => {
      const response = await request(app)
        .post("/admin/war")
        .send({})
        .set({ Authorization: `Bearer ${token}` });
      expect(response.status).toBe(500);
    });

    test("Create war : need to be admin", async () => {
      const response = await request(app)
        .post("/admin/war")
        .send({})
        .set({ Authorization: `Bearer ${usertoken}` });
      expect(response.status).toBe(401);
    });

    test("Create War : failure : same name", async () => {
      const response = await request(app)
        .post("/admin/war")
        .send(warToCreate)
        .set({ Authorization: `Bearer ${token}` });
      expect(response.status).toBe(500);
    });
  });

  describe("Get:Wars", () => {
    test("Get wars : Success", async () => {
      const response = await request(app)
        .get("/admin/war")
        .set({ Authorization: `Bearer ${token}` });
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(2);
      expect(response.body[0].name).toBe(war.name);
      expect(response.body[1].name).toBe(warToCreate.war_name);
      expect(response.body[1]._id).toBeDefined();
    });
  });

  describe("War:join", () => {
    test("Join war : Success", async () => {
      const response = await request(app)
        .post(`/api/war/${war._id}/join`)
        .send(users[0])
        .set({ Authorization: `Bearer ${usertoken}` });
      expect(response.status).toBe(201);
      expect(response.body.users.length).toBe(users.length + 1);
      expect(response.body.name).toBe(war.name);
      expect(response.body._id).toBeDefined();
    });

    test("Join war : failure", async () => {
      const response = await request(app)
        .post(`/api/war/${war._id}/join`)
        .send(users[0])
        .set({ Authorization: `Bearer ${usertoken}` });
      expect(response.status).toBe(201);
      expect(response.body.users.length).toBe(users.length + 1);
      expect(response.body.name).toBe(war.name);
      expect(response.body._id).toBeDefined();
    });
  });
});
