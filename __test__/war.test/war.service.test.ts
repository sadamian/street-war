import * as dotenv from "dotenv";
import { createContracts } from "../../src/module/war/war.service";
import { users } from "../fixture/user.fixture";
import { war } from "../fixture/war.fixture";

describe("Test: function createContracts ", () => {
  //beforeAll(() => dotenv.config());

  it("Should create contract", () => {
    const expected = {
      size: 6,
    };
    const result = createContracts(war, users);
    expect(result.length).toEqual(expected.size);
    expect(result[result.length - 1].hitman).toEqual(
      users[users.length - 1]._id
    );
    expect(result[result.length - 1].target).toEqual(users[0]._id);
    expect(result[1].target).toEqual(users[2]._id);
  });
});
