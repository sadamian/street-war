/*
 *  Static Method who gonna me used by ContractModel
 * */

import {
  IContractDocument,
  IContractModel,
} from "./contract.database.interface";
import { IWar } from "../../war/war.interface";
import { ContractStatus } from "../contract.interface";

export async function findByWar(
  this: IContractModel,
  war: string
): Promise<IContractDocument[]> {
  return this.find({ war });
}

export async function findActiveContracts(
  this: IContractModel
): Promise<IContractDocument[]> {
  return this.find({ status: "PENDING" });
}

export async function findActiveContractsByWar(
  this: IContractModel,
  war: string
): Promise<IContractDocument[]> {
  return this.find({ status: "PENDING", war });
}

export async function findByActiveHitman(
  this: IContractModel,
  user_id: string
): Promise<IContractDocument[]> {
  return this.find({ status: "PENDING", hitman: user_id });
}

export async function findByWarHitmanAndStatus(
  this: IContractModel,
  war: string,
  hitman: string,
  status: ContractStatus
): Promise<IContractDocument[]> {
  return this.find({ war, status, hitman });
}
