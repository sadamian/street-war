/*
 *  Instance Method who gonna me used by an instance of ContractModel
 * */

import { IContractDocument } from "./contract.database.interface";
import { ContractModel } from "./contract.database.model";
import { IContract } from "../contract.interface";
import { WarModel } from "../../war/war.database/war.database.model";
/*
*
* export type ContractStatus = "PENDING" | "DONE" | "FAIL";

export interface IContract {
  _id?: UUID;
  hitman: string;
  target: string;
  war: string;
  code: string; // code to confirm kill
  createdAt: number;
  status: ContractStatus;
}

* */

export async function start(
  this: IContractDocument
): Promise<IContractDocument> {
  // notif users
  return this;
}

/*
 * if end
 * then -> check if it's the last
 * */
export async function end(this: IContractDocument): Promise<IContractDocument> {
  // check stringos

  this.status = "DONE";
  await this.save();

  const contractToPutAsFail: IContractDocument[] = await ContractModel.findByWarHitmanAndStatus(
    this.war,
    this.target,
    "PENDING"
  );
  const firstContractToPutAsFail = contractToPutAsFail[0];
  firstContractToPutAsFail.status = "FAIL";
  await firstContractToPutAsFail.save();

  //get number of active contracts
  const leftContracts = await ContractModel.findActiveContractsByWar(this.war);
  const war = await WarModel.findById(this.war);

  if (leftContracts.length === 0) {
    await war.end();
    return this;
  } else {
    const newContractRaw: IContract = {
      target: firstContractToPutAsFail.target,
      war: firstContractToPutAsFail.war,
      code: "stringos",
      hitman: this.hitman,
      createdAt: Date.now(),
      status: "PENDING",
    };

    const newContract = await ContractModel.create(newContractRaw);
    await war.addContract(newContract);
    await newContract.start();

    return newContract;
  }
}
