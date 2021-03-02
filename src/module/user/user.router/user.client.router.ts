import {
  getAllUserController,
  userInfoController,
  getUserController,
} from "../user.controller";
import express from "express";
import { authHandler } from "../../../middleware/auth.middleware";
import { userAdminRouter } from "./user.admin.router";

export const userClientRouter = express.Router();

userClientRouter.use(authHandler);

userClientRouter.get("/", getAllUserController);
userClientRouter.get("/info", userInfoController);
userClientRouter.get("/:user_id", getUserController);
