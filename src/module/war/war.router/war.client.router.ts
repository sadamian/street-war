import express from "express";
import { incorporateUserWarController } from "../war.controller";
import { authHandler } from "../../../middleware/auth.middleware";

// no client route for war

export const warClientRouter = express.Router();

warClientRouter.use(authHandler);

warClientRouter.post("/:war_id/join", incorporateUserWarController);
