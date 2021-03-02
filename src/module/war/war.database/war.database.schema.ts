/*
export interface IWar {
  name: string;
  createdAt: string;
  users: [string];
  contracts: [string];
}

 * */

import mongoose, { Schema } from "mongoose";
import {
  getUsers,
  getActiveUsers,
  getContracts,
  getActiveContracts,
  startWar,
  endWar,
  incorporateUser,
  generateContracts,
  addContract,
} from "./war.database.method";
import { getActiveWars } from "./war.database.static";

const WarSchema = new Schema({
  name: { type: String, unique: true, required: true },
  createdAt: { type: String, required: true },
  users: { type: [mongoose.Types.ObjectId], required: true },
  contracts: { type: [mongoose.Types.ObjectId], required: true },
  status: { type: String, required: true },
});

WarSchema.statics.getActiveWars = getActiveWars;

WarSchema.methods.getUsers = getUsers;
WarSchema.methods.getActiveUsers = getActiveUsers;
WarSchema.methods.getContracts = getContracts;
WarSchema.methods.getActiveContracts = getActiveContracts;
WarSchema.methods.start = startWar;
WarSchema.methods.end = endWar;
WarSchema.methods.incorporateUser = incorporateUser;
WarSchema.methods.generateContracts = generateContracts;
WarSchema.methods.addContract = addContract;

export default WarSchema;
