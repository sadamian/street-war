import { UUID } from "../../common/type/uuid.type";

export interface ILogin {
  username: string;
  password: string;
}

export interface IAuth {
  _id?: UUID;
  token: string;
  user_id: string;
  revoked?: boolean;
}
