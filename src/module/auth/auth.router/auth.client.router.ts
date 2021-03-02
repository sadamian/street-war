import { loginController } from "../auth.controller";
import express from "express";

export const authClientRouter = express.Router();

authClientRouter.post("/login", loginController);
