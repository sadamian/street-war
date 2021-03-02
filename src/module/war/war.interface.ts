import { UUID } from "../../common/type/uuid.type";
import mongoose from "mongoose";

export type WarStatusType = "READY" | "ACTIVE" | "FINAL" | "DONE";

export interface IWar {
  _id?: UUID;
  name: string;
  createdAt: number;
  users: mongoose.Types.ObjectId[];
  contracts: mongoose.Types.ObjectId[];
  status: WarStatusType;
}
