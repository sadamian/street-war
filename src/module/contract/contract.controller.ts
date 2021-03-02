import { Request, Response } from "express";
import { IContract } from "./contract.interface";
import {
  findAll,
  find,
  askEnd,
} from "./contract.database/contract.database.service";

/**
 * Controller Definitions
 */

export async function getAllContractController(req: Request, res: Response) {
  try {
    const contracts: IContract[] = await findAll();
    res.status(200).send(contracts);
  } catch (e) {
    res.status(404).send(e.message);
  }
}

export async function getContractController(req: Request, res: Response) {
  try {
    const contract_id: string = req.params.contract_id;
    const contract: IContract | null = await find(contract_id);
    res.status(200).send(contract);
  } catch (e) {
    res.status(404).send(e.message);
  }
}

// TODO: should be contract/:id/end/:token
// token should prouve validity of kill, only available
export async function askEndContractController(req: Request, res: Response) {
  try {
    const contract_id: string = req.params.contract_id;
    const contract = await askEnd(contract_id);
    res.status(200).send(contract);
  } catch (e) {
    res.status(404).send(e.message);
  }
}
