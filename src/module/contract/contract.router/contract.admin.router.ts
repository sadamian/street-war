import { getAllContractController } from "../contract.controller";
import express from "express";
import { adminHandler, authHandler } from "../../../middleware/auth.middleware";

export const contractAdminRouter = express.Router();
contractAdminRouter.use(authHandler);
contractAdminRouter.use(adminHandler);
contractAdminRouter.get("/", getAllContractController);
