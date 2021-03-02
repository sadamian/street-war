import {
  createWarController,
  endWarController,
  getAllWarController,
  getWarController,
  startWarController,
} from "../war.controller";
import express from "express";
import { adminHandler, authHandler } from "../../../middleware/auth.middleware";

export const warAdminRouter = express.Router();

warAdminRouter.use(authHandler);
warAdminRouter.use(adminHandler);
warAdminRouter.get("/", getAllWarController);
warAdminRouter.get("/:war_id", getWarController);
warAdminRouter.get("/:war_id/end", endWarController);
warAdminRouter.get("/:war_id/start", startWarController);
warAdminRouter.post("/", createWarController);
