/*
 *  Static Method who gonna me used by AuthModel
 * */

import { IAuthDocument, IAuthModel } from "./auth.database.interface";
import { ILogin } from "../auth.interface";
import { UserModel } from "../../user/user.database/user.database.model";
import { generateToken } from "../auth.service";
import { AuthModel } from "./auth.database.model";

export async function revokeAll(this: IAuthModel): Promise<IAuthDocument[]> {
  return this.updateMany({}, { revoke: true });
}

export async function generate(
  this: IAuthModel,
  user_id: string
): Promise<IAuthDocument> {
  const user = await UserModel.findById(user_id);
  if (!user || !user._id) {
    throw new Error("No User");
  }
  const token = generateToken(user._id);
  return AuthModel.create({ user_id: user._id, token });
}
