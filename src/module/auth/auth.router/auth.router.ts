import express, { Request, Response } from "express";
import { authAdminRouter } from "./auth.admin.router";
import { authClientRouter } from "./auth.client.router";

export const authRouter = express.Router();

/**
 * Route Definitions
 */

authRouter.use("/admin/auth", authAdminRouter);
authRouter.use("/auth", authClientRouter);
