import { createUserController } from "../user.controller";
import express from "express";
import { adminHandler, authHandler } from "../../../middleware/auth.middleware";

export const userAdminRouter = express.Router();
userAdminRouter.use(authHandler);
userAdminRouter.use(adminHandler);
userAdminRouter.post("/", createUserController);
