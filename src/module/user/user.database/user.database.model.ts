/*
 * Mongoose Model who is structured by interfaces
 * */

import { model } from "mongoose";
import { IUserDocument, IUserModel } from "./user.database.interface";
import UserSchema from "./user.database.schema";
// import {name} from "./user.constant";

export const UserModel = model<IUserDocument, IUserModel>("user", UserSchema);
