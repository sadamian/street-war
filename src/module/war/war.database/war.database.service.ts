import { IWar } from "../war.interface";
import { WarModel } from "./war.database.model";
import { UUID } from "../../../common/type/uuid.type";
import { IWarDocument } from "./war.database.interface";

/**
 * Service Methods
 */

export const findAll = async (): Promise<IWar[]> => {
  return WarModel.find();
};

export const find = async (id: string): Promise<IWar | null> => {
  return WarModel.findById(id);
};

export const create = async (newItem: IWar): Promise<IWar> => {
  return WarModel.create(newItem);
};

export const update = async (id: UUID, updatedItem: IWar): Promise<IWar> => {
  return WarModel.updateOne({ id }, updatedItem);
};

export const remove = async (id: string): Promise<void> => {
  const record = WarModel.deleteOne({ id });
  if (record) {
    return;
  }
  throw new Error("No record found to delete");
};

export const start = async (id: UUID): Promise<IWar> => {
  const war: IWarDocument = await WarModel.findById(id);
  await war.start();
  return war;
};

export const end = async (id: UUID): Promise<IWar> => {
  const war = await WarModel.findById(id);
  await war.end();
  return war;
};

export const incorporateUser = async (
  war_id: UUID,
  user_id: UUID
): Promise<IWar> => {
  const war: IWarDocument = await WarModel.findById(war_id);
  if (!war) {
    throw new Error("No war to incorporate");
  }
  if (war.status !== "READY") {
    throw new Error("war already start");
  }
  await war.incorporateUser(user_id);
  return war;
};
