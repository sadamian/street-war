import { IWarDocument } from "../../src/module/war/war.database/war.database.interface";

const { setupDB } = require("../bdd-test.setup");
import { IUser } from "../../src/module/user/user.interface";
import { UserModel } from "../../src/module/user/user.database/user.database.model";
import { WarModel } from "../../src/module/war/war.database/war.database.model";
import { users } from "../fixture/user.fixture";
import { war } from "../fixture/war.fixture";
import { IWar } from "../../src/module/war/war.interface";
import { ContractModel } from "../../src/module/contract/contract.database/contract.database.model";

describe("War:database", () => {
  setupDB("test-war-database-bdd");

  beforeAll(async () => {
    await UserModel.insertMany(users);
  });

  afterAll(async () => {
    await UserModel.remove({});
    await ContractModel.remove({});
    await WarModel.remove({});
  });

  describe("Create:War", () => {
    test("Create War success", async () => {
      const warCreated = await WarModel.create(war);
      const record: IWar[] = await WarModel.find();
      expect(record.length).toBe(1);
      expect(warCreated.name).toBe(war.name);
      expect(record[0].name).toBe(war.name);
    });

    test("Create War failure", async () => {
      let isThrow = false;
      try {
        await WarModel.create({ contracts: [] });
        expect(false).toBe(true);
      } catch (e) {
        const record: IWar[] = await WarModel.find();
        expect(record.length).toBe(1);
        isThrow = true;
      }
      expect(isThrow).toBe(true);
    });

    test("Get One War", async () => {
      const record: IWar[] = await WarModel.find();
      expect(record.length).toBe(1);
    });
  });

  describe("War:contracts", () => {
    test("init before contract", async () => {
      const wars: IWarDocument[] = await WarModel.find();
      const warDoc = wars[0];
      expect(warDoc).toBeDefined();
    });

    test("check initial values before", async () => {
      const wars: IWarDocument[] = await WarModel.find();
      const warDoc = wars[0];
      expect(warDoc.contracts.length).toBe(0);
      expect(warDoc.users.length).toBe(6);
    });

    test("Check contract generation", async () => {
      const wars: IWarDocument[] = await WarModel.find();
      const warDoc = wars[0];
      expect(warDoc.contracts.length).toBe(0);
      await warDoc.start();
      expect(warDoc.contracts.length).toBe(6);
      expect(warDoc.contracts.length).toBe(warDoc.users.length);
      expect(warDoc.users.length).toBe(6);
    });
  });

  describe("War:user", () => {
    let war: IWarDocument;

    beforeAll(async () => {
      const warRaw: IWar = {
        contracts: [],
        users: [],
        status: "READY",
        name: "Wartitos",
        createdAt: Date.now(),
      };
      war = await WarModel.create(warRaw);
    });

    test("Check war was created", async () => {
      expect(war).toBeDefined();
    });

    test("Add User", async () => {
      await war.incorporateUser(users[0]._id);
      expect(war.users.length).toBe(1);
      await war.incorporateUser(users[1]._id);
      expect(war.users.length).toBe(2);
    });

    test("Add User Fail : ALready added", async () => {
      expect(war.users.length).toBe(2);
      await war.incorporateUser(users[0]._id);
      expect(war.users.length).toBe(2);
    });
  });
});
