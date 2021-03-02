/*
 *  Static Method who gonna me used by WarModel
 * */

import { IWarDocument, IWarModel } from "./war.database.interface";

export async function getActiveWars(this: IWarModel): Promise<IWarDocument[]> {
  return this.find({ status: "ACTIVE" });
}
