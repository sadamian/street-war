/**
 *
 * Interface who gonna help to build the UserModel
 */

import { Document, Model } from "mongoose";
import { IUser } from "../user.interface";

// Interface for BDD document + for instance methods
export interface IUserDocument extends IUser, Document {}

// Interface for BDD model + for static methods
export interface IUserModel extends Model<IUserDocument> {
  findByWar: (this: IUserModel, war: string) => Promise<IUserDocument[]>;
  findByName: (this: IUserModel, name: string) => Promise<IUserDocument>;
}
