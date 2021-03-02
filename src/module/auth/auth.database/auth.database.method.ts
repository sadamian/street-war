/*
 *  Instance Method who gonna me used by an instance of AuthModel
 * */

import { IAuthDocument } from "./auth.database.interface";

export async function revoke(this: IAuthDocument): Promise<IAuthDocument> {
  return this.update({ revoke: true });
}
