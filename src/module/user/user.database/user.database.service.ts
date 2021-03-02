import { IPublicUser, IUser } from "../user.interface";
import { UserModel } from "./user.database.model";
import { UUID } from "../../../common/type/uuid.type";
import { IUserDocument } from "./user.database.interface";
import { ContractModel } from "../../contract/contract.database/contract.database.model";
import { hashPassword } from "../../auth/auth.service";

/**
 * Service Methods
 */

export const findAll = async (): Promise<IUser[]> => {
  return UserModel.find().select("-password");
};

export const find = async (id: string): Promise<IUserDocument> => {
  const user: IUserDocument = await UserModel.findById(id).select("-password");
  return user;
};

export const create = async (newItem: IUser): Promise<IUserDocument> => {
  const hash_password = await hashPassword(newItem.password);
  return UserModel.create({ ...newItem, password: hash_password });
};

export const update = async (id: UUID, updatedItem: IUser): Promise<IUser> => {
  return UserModel.updateOne({ id }, updatedItem).select("-password");
};

export const remove = async (id: string): Promise<void> => {
  const record = UserModel.deleteOne({ id });

  if (record) {
    return;
  }

  throw new Error("No record found to delete");
};

export const findByWar = async (war: string): Promise<IUserDocument[]> => {
  return UserModel.findByWar(war);
};

export const getUserInfo = async (user_id: string): Promise<Object> => {
  const user: IPublicUser = await find(user_id);
  const contracts = await ContractModel.findByActiveHitman(user_id);
  return { user, contracts };
};
