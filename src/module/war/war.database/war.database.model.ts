/*
 * Mongoose Model who is structured by interfaces
 * */

import { model } from "mongoose";
import { IWarDocument, IWarModel } from "./war.database.interface";
import WarSchema from "./war.database.schema";
// import {name} from "./war.constant";

export const WarModel = model<IWarDocument, IWarModel>("war", WarSchema);
