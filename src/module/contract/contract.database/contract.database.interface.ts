/**
 *
 * Interface who gonna help to build the ContractModel
 */

import { Document, Model } from "mongoose";
import { IContract, ContractStatus } from "../contract.interface";

// Interface for BDD document + for instance methods
export interface IContractDocument extends IContract, Document {
  end: (this: IContractDocument) => Promise<IContractDocument>;
  start: (this: IContractDocument) => Promise<IContractDocument>;
}

// Interface for BDD model + for static methods
export interface IContractModel extends Model<IContractDocument> {
  findByWar: (
    this: IContractModel,
    war: string
  ) => Promise<IContractDocument[]>;
  findActiveContracts: (this: IContractModel) => Promise<IContractDocument[]>;
  findByWarHitmanAndStatus: (
    this: IContractModel,
    war: string,
    hitman: string,
    status: ContractStatus
  ) => Promise<IContractDocument[]>;
  findByActiveHitman: (
    this: IContractModel,
    hitman: string
  ) => Promise<IContractDocument[]>;
  findActiveContractsByWar: (
    this: IContractModel,
    war: string
  ) => Promise<IContractDocument[]>;
}
