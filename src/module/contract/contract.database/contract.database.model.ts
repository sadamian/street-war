/*
 * Mongoose Model who is structured by interfaces
 * */

import { model } from "mongoose";
import {
  IContractDocument,
  IContractModel,
} from "./contract.database.interface";
import ContractSchema from "./contract.database.schema";
// import {name} from "./contract.constant";

export const ContractModel = model<IContractDocument, IContractModel>(
  "contract",
  ContractSchema
);
