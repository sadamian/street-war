import express from "express";
import { authHandler, adminHandler } from "../../../middleware/auth.middleware";
import { revokeAll } from "../auth.database/auth.database.service";

export const authAdminRouter = express.Router();
authAdminRouter.use(authHandler);
authAdminRouter.use(adminHandler);
authAdminRouter.get("/revoke", revokeAll);
