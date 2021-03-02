import { Request, Response } from "express";
import { create } from "./auth.database/auth.database.service";
import { IAuth, ILogin } from "./auth.interface";
import { comparePassword } from "./auth.service";
import { UserModel } from "../user/user.database/user.database.model";

/**
 * Controller Definitions
 */

export async function loginController(req: Request, res: Response) {
  try {
    // check if user with this username
    // get user info and password
    // check if password matches
    // create auth object
    // Send auth object

    const user = await UserModel.findByName(req.body.username);
    if (!user) {
      throw new Error("login and username does not match");
    }
    const samePwd = await comparePassword(req.body.password, user.password);
    if (!samePwd) {
      throw new Error("login and username does not match");
    }
    const auth: IAuth = await create(user._id);
    res.status(200).send(auth);
  } catch (e) {
    res.status(403).send(e.message);
  }
}
