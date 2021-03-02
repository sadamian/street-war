const { setupDB } = require("../bdd-test.setup");
import { IUser } from "../../src/module/user/user.interface";
import { UserModel } from "../../src/module/user/user.database/user.database.model";
import { users } from "../fixture/user.fixture";

describe("User:database", () => {
  setupDB("test-user-bdd");

  beforeAll(async () => {
    await UserModel.insertMany(users);
  });

  afterAll(async () => {
    await UserModel.remove({});
  });

  describe("Get all users", () => {
    test("Should get all products", async () => {
      const record: IUser[] = await UserModel.find();
      expect(record.length).toBe(users.length);
    });

    test("Get one user", async () => {
      const product: IUser = {
        name: "Namitos",
        secret: "secretos",
        password: "lol",
      };
      const productCreated = await UserModel.create(product);
      const productFound = await UserModel.findOne({ name: product.name });
      expect(productCreated.id).toBe(productFound.id);
    });
  });
});
