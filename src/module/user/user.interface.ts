import { UUID } from "../../common/type/uuid.type";

export interface IUser extends IPublicUser {
  password: string;
}

export interface IPublicUser {
  _id?: UUID;
  secret: string;
  name: string;
  admin?: boolean;
}
