/*
 * Mongoose shema
 *  name: string;
  avantage: AvantageType;
  restrictions: object;
 * */

import mongoose, { Schema } from "mongoose";
import { end, start } from "./contract.database.method";
import {
  findByWar,
  findByWarHitmanAndStatus,
  findActiveContracts,
  findActiveContractsByWar,
  findByActiveHitman,
} from "./contract.database.static";

const ContractSchema = new Schema({
  hitman: mongoose.Types.ObjectId,
  target: mongoose.Types.ObjectId,
  war: mongoose.Types.ObjectId,
  createdAt: String,
  status: String,
});

ContractSchema.statics.findByWar = findByWar;
ContractSchema.statics.findByWarHitmanAndStatus = findByWarHitmanAndStatus;
ContractSchema.statics.findActiveContracts = findActiveContracts;
ContractSchema.statics.findActiveContractsByWar = findActiveContractsByWar;
ContractSchema.statics.findByActiveHitman = findByActiveHitman;

ContractSchema.methods.end = end;
ContractSchema.methods.start = start;

// ContractSchema.post("update", async function (doc) {
//   // if start
//   // users get notified
//
//   // if contract is closed
//   // get list of contract
//   // if last contract -> end war
//   // else create new contract with hitman and victim of victim
//   // await doMoreStuff();
// });

export default ContractSchema;
