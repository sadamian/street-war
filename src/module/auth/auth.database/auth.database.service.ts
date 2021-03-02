import { IAuth, ILogin } from "../auth.interface";
import { IAuthDocument } from "./auth.database.interface";
import { AuthModel } from "./auth.database.model";

/**
 * Service Methods
 */

export const findAll = async (): Promise<IAuth[]> => {
  return AuthModel.find();
};

export const find = async (id: string): Promise<IAuth | null> => {
  return AuthModel.findById(id);
};

export const create = async (user_id: string): Promise<IAuth> => {
  return AuthModel.generate(user_id);
};

export const remove = async (id: string): Promise<void> => {
  const record = await AuthModel.deleteOne({ id });

  if (record) {
    return;
  }

  throw new Error("No record found to delete");
};

export const revokeAll = async (): Promise<void> => {
  await AuthModel.revokeAll();
  return;
};

export const revoke = async (id: string): Promise<void> => {
  const auth: IAuthDocument = AuthModel.findById(id);
  if (!auth) {
    throw new Error("No record found to revoke");
  }
  await auth.revoke();

  return;
};
