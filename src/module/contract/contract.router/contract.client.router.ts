import {
  getContractController,
  askEndContractController,
} from "../contract.controller";
import express from "express";
import { authHandler } from "../../../middleware/auth.middleware";

export const contractClientRouter = express.Router();

contractClientRouter.use(authHandler);

contractClientRouter.get("/:contract_id", getContractController);
contractClientRouter.get("/:contract_id/end", askEndContractController);
