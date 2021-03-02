/*
 * Mongoose shema
 *  name: string;
  avantage: AvantageType;
  restrictions: object;
 * */

import { Schema } from "mongoose";
import { findByWar, findByName } from "./user.database.static";

const UserSchema = new Schema({
  name: { type: String, unique: true, required: true },
  secret: { type: String, required: true },
  admin: { type: Boolean, default: false },
  password: { type: String, required: true },
});

UserSchema.statics.findByWar = findByWar;
UserSchema.statics.findByName = findByName;

export default UserSchema;
