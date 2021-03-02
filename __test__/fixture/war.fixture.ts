import { IWar } from "../../src/module/war/war.interface";
import { users } from "./user.fixture";
import mongoose from "mongoose";

export const war: IWar = {
  _id: mongoose.Types.ObjectId(),
  status: "READY",
  createdAt: Date.now(),
  name: "unaswar",
  users: users.map((u) => u._id),
  contracts: [],
};
