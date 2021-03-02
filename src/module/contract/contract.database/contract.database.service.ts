import { IContract } from "../contract.interface";
import { ContractModel } from "./contract.database.model";
import { UUID } from "../../../common/type/uuid.type";
import { IWar } from "../../war/war.interface";
import { IContractDocument } from "./contract.database.interface";

/**
 * Service Methods
 */

export const findAll = async (): Promise<IContract[]> => {
  return ContractModel.find();
};

export const find = async (id: string): Promise<IContract | null> => {
  return ContractModel.findById(id);
};

export const create = async (newItem: IContract): Promise<IContract> => {
  return ContractModel.create(newItem);
};

export const update = async (
  id: UUID,
  updatedItem: IContract
): Promise<IContract> => {
  return ContractModel.updateOne({ id }, updatedItem);
};

export const remove = async (id: string): Promise<void> => {
  const record = await ContractModel.deleteOne({ id });

  if (record) {
    return;
  }

  throw new Error("No record found to delete");
};

export const findByWar = async (war: string): Promise<IContract[]> => {
  return await ContractModel.findByWar(war);
};

export const askEnd = async (id: string): Promise<IContract> => {
  const contract: IContractDocument = await ContractModel.findById(id);
  return await contract.end();
};
