/**
 *
 * Interface who gonna help to build the AuthModel
 */

import { Document, Model } from "mongoose";
import { IAuth, ILogin } from "../auth.interface";

// Interface for BDD document + for instance methods
export interface IAuthDocument extends IAuth, Document {
  revoke: (this: IAuthDocument) => Promise<IAuthDocument>;
}

// Interface for BDD model + for static methods
export interface IAuthModel extends Model<IAuthDocument> {
  revokeAll: (this: IAuthModel) => Promise<IAuthDocument[]>;
  generate: (this: IAuthModel, user_id: string) => Promise<IAuthDocument>;
}
