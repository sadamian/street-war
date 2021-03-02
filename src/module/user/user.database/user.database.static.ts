/*
 *  Static Method who gonna me used by UserModel
 * */

import { IUserDocument, IUserModel } from "./user.database.interface";

export async function findByWar(
  this: IUserModel,
  war: string
): Promise<IUserDocument[]> {
  return this.find({ war }).select("-password");
}

export async function findByName(
  this: IUserModel,
  name: string
): Promise<IUserDocument> {
  const users = await this.find({ name });
  if (users.length < 1) {
    throw new Error("cannot find user");
  }
  return users[0];
}
