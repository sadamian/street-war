import { Request, Response } from "express";
import { IWar } from "./war.interface";
import {
  findAll,
  create,
  find,
  start,
  end,
  incorporateUser,
} from "./war.database/war.database.service";

/**
 * Controller Definitions
 */

export async function getAllWarController(req: Request, res: Response) {
  try {
    const wars: IWar[] = await findAll();
    res.status(200).send(wars);
  } catch (e) {
    res.status(404).send(e.message);
  }
}

export async function getWarController(req: Request, res: Response) {
  try {
    const war_id: string = req.params.war_id;
    const war: IWar | null = await find(war_id);
    if (!war) {
      throw new Error(`War ${war_id} does not exists`);
    }
    res.status(200).send(war);
  } catch (e) {
    res.status(404).send(e.message);
  }
}

export async function startWarController(req: Request, res: Response) {
  try {
    const war_id: string = req.params.war_id;
    const war: IWar | null = await find(war_id);
    if (!war) {
      throw new Error(`War ${war_id} does not exists`);
    }
    const newWare = await start(war_id);
    res.status(200).send(newWare);
  } catch (e) {
    res.status(404).send(e.message);
  }
}

export async function endWarController(req: Request, res: Response) {
  try {
    const war_id: string = req.params.war_id;
    const war: IWar | null = await find(war_id);
    if (!war) {
      throw new Error(`War ${war_id} does not exists`);
    }
    const newWare = await end(war_id);
    res.status(200).send(newWare);
  } catch (e) {
    res.status(404).send(e.message);
  }
}

export async function createWarController(req: Request, res: Response) {
  try {
    const war_name: string = req.body.war_name;
    if (!war_name) {
      throw new Error(`Need name to create war`);
    }
    const warRaw: IWar = {
      users: [],
      name: war_name,
      createdAt: Date.now(),
      status: "READY",
      contracts: [],
    };
    const war = await create(warRaw);
    res.status(201).send(war);
  } catch (e) {
    res.status(500).send(e.message);
  }
}

export async function incorporateUserWarController(
  req: Request,
  res: Response
) {
  try {
    const war_id: string = req.params.war_id;
    const user_id: string = req.body.user_id;
    const newWare = await incorporateUser(war_id, user_id);

    res.status(201).send(newWare);
  } catch (e) {
    res.status(500).send(e.message);
  }
}
