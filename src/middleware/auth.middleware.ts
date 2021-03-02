import { Request, Response, NextFunction } from "express";
import { decryptToken } from "../module/auth/auth.service";
import { UserModel } from "../module/user/user.database/user.database.model";

export async function authHandler(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const bearerAuth = request.get("Authorization");
    if (!bearerAuth || bearerAuth.length < 1) {
      return response
        .status(401)
        .send("You need to be logged to access to this resource");
    }
    const auth = bearerAuth.split(" ")[1];
    if (!auth) {
      return response
        .status(401)
        .send("You need to be logged to access to this resource");
    }

    const token = decryptToken(auth);
    request.headers["user-id"] = token.data.user_id;
    next();
  } catch (e) {
    return response.status(401).send(e);
  }
}

export async function adminHandler(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const user_id = request.headers["user-id"];
    // find User and check if admin
    const user = await UserModel.findById(user_id);
    if (!user.admin) {
      throw new Error("only for admin");
    }
    next();
  } catch (e) {
    return response.status(401).send(e);
  }
}
