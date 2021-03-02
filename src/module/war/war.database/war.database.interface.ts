/**
 *
 * Interface who gonna help to build the WarModel
 */

import { Document, Model } from "mongoose";
import { IWar } from "../war.interface";
import { IContractDocument } from "../../contract/contract.database/contract.database.interface";
import { IUserDocument } from "../../user/user.database/user.database.interface";

// Interface for BDD document + for instance methods
export interface IWarDocument extends IWar, Document {
  getUsers: (this: IWarDocument) => Promise<IUserDocument[]>;
  getActiveUsers: (this: IWarDocument) => Promise<IUserDocument[]>;
  getContracts: (this: IWarDocument) => Promise<IContractDocument[]>;
  getActiveContracts: (this: IWarDocument) => Promise<IContractDocument[]>;
  start: (this: IWarDocument) => Promise<IWarModel>;
  end: (this: IWarDocument) => Promise<IWarModel>;
  incorporateUser: (
    this: IWarDocument,
    user_id: string
  ) => Promise<IWarDocument>;
  generateContracts: (this: IWarDocument) => Promise<IWarDocument>;
  addContract: (
    this: IWarDocument,
    contract: IContractDocument
  ) => Promise<IWarDocument>;
}

// Interface for BDD model + for static methods
export interface IWarModel extends Model<IWarDocument> {
  getActiveWars: (this: IWarModel) => Promise<IWarDocument[]>;
}
