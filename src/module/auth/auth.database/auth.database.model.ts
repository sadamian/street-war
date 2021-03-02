/*
 * Mongoose Model who is structured by interfaces
 * */

import { model } from "mongoose";
import { IAuthDocument, IAuthModel } from "./auth.database.interface";
import AuthSchema from "./auth.database.schema";

export const AuthModel = model<IAuthDocument, IAuthModel>("auth", AuthSchema);
