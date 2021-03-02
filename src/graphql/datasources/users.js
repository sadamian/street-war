import { DataSource } from "apollo-datasource";
import { findAll } from "../../module/user/user.database/user.database.service";

export default class UserAPI extends DataSource {
  constructor() {
    super();
  }

  async getUsers() {
    const users = await findAll();
    return users;
  }
}
