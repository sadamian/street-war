import { Request, Response } from "express";
import { IPublicUser, IUser } from "./user.interface";
import {
  findAll,
  create,
  getUserInfo,
  find,
} from "./user.database/user.database.service";
import { UserModel } from "./user.database/user.database.model";

/**
 * Controller Definitions
 */

export async function getAllUserController(req: Request, res: Response) {
  try {
    const users: IUser[] = await findAll();
    res.status(200).send(users);
  } catch (e) {
    res.status(404).send(e.message);
  }
}

export async function createUserController(req: Request, res: Response) {
  try {
    const item: IUser = req.body;
    const user: IPublicUser = await create(item);
    res.status(201).send(user);
  } catch (e) {
    res.status(500).send(e.message);
  }
}

export async function getUserController(req: Request, res: Response) {
  try {
    const user_id: string = req.params?.user_id;
    const user: IPublicUser = await find(user_id);
    res.status(201).send(user);
  } catch (e) {
    res.status(500).send(e.message);
  }
}

export async function userInfoController(req: Request, res: Response) {
  try {
    // switch to auth
    if (req.headers["user-id"] && typeof req.headers["user-id"] === "string") {
      const user_id: string = req.headers["user-id"];
      const info = await getUserInfo(user_id);
      res.status(201).send(info);
    } else {
      throw new Error("no token");
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
}
