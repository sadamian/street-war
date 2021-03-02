/*
 *  Instance Method who gonna me used by an instance of WarModel
 * */

import { IWarDocument } from "./war.database.interface";
import { IUser } from "../../user/user.interface";
import { IContract } from "../../contract/contract.interface";
import { ContractModel } from "../../contract/contract.database/contract.database.model";
import { createContracts } from "../war.service";
import { IContractDocument } from "../../contract/contract.database/contract.database.interface";

export async function generateContracts(
  this: IWarDocument
): Promise<IWarDocument> {
  const contractsRaw: IContract[] = createContracts(this, this.get("users"));
  const contracts: IContractDocument[] = await Promise.all(
    contractsRaw.map((c: IContract) => ContractModel.create(c))
  );
  this.contracts = contracts.map((contract) => contract._id);
  return this.save();
}

export async function getUsers(this: IWarDocument): Promise<IUser[]> {
  return this.get("users");
}

export async function getActiveUsers(this: IWarDocument): Promise<IUser[]> {
  const users = await this.get("users");
  // TODO: search in contracts if users still playing
  return users;
}

export async function getContracts(this: IWarDocument): Promise<IContract[]> {
  return this.get("contracts");
}

export async function getActiveContracts(
  this: IWarDocument
): Promise<IContract[]> {
  const contracts = await this.get("contracts");
  // TODO: search in contracts if status PENDING

  const activeContracts = contracts.map(
    (c: IContract) => c.status === "PENDING"
  );
  return activeContracts;
}

export async function startWar(this: IWarDocument): Promise<IWarDocument> {
  this.status = "ACTIVE";
  // create all contracts
  await this.generateContracts();
  await this.save();

  return this;
}

export async function endWar(this: IWarDocument): Promise<IWarDocument> {
  this.status = "DONE";
  await this.save();
  return this;
}

export async function incorporateUser(
  this: IWarDocument,
  user_id: string
): Promise<IWarDocument> {
  this.get("users").addToSet(user_id);
  await this.save();
  return this;
}

export async function addContract(
  this: IWarDocument,
  contract_id: string
): Promise<IWarDocument> {
  this.get("contracts").addToSet(contract_id);
  await this.save();
  return this;
}
