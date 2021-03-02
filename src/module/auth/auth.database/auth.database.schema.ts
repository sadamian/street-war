import mongoose, { Schema } from "mongoose";
import { revokeAll, generate } from "./auth.database.static";
import { revoke } from "./auth.database.method";

/*  token: string;
  user_id: string;
  revoke?: boolean;*/
const AuthSchema = new Schema({
  token: { type: String, unique: true, required: true },
  user_id: { type: mongoose.Types.ObjectId, required: true },
  revoked: { type: Boolean, required: false, default: false },
});

AuthSchema.statics.revokeAll = revokeAll;
AuthSchema.statics.generate = generate;
AuthSchema.methods.revoke = revoke;

export default AuthSchema;
