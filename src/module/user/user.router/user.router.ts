import express, { Request, Response } from "express";
import { userAdminRouter } from "./user.admin.router";
import { userClientRouter } from "./user.client.router";

export const userRouter = express.Router();

/**
 * Route Definitions
 */

// GET user/
userRouter.use("/admin/user", userAdminRouter);
userRouter.use("/api/user", userClientRouter);
