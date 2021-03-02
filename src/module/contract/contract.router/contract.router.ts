import express, { Request, Response } from "express";
import { contractAdminRouter } from "./contract.admin.router";
import { contractClientRouter } from "./contract.client.router";

export const contractRouter = express.Router();

/**
 * Route Definitions
 */

// GET contract/
contractRouter.use("/admin/contract", contractAdminRouter);
contractRouter.use("/api/contract", contractClientRouter);
