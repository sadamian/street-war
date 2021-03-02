import express, { Request, Response } from "express";
import { warAdminRouter } from "./war.admin.router";
import { warClientRouter } from "./war.client.router";

export const warRouter = express.Router();

/**
 * Route Definitions
 */

// GET war/
warRouter.use("/admin/war", warAdminRouter);
warRouter.use("/api/war", warClientRouter);
