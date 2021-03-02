import express from "express";
import { warRouter } from "./module/war/war.router/war.router";
import { contractRouter } from "./module/contract/contract.router/contract.router";
import { userRouter } from "./module/user/user.router/user.router";
import { authRouter } from "./module/auth/auth.router/auth.router";

export const mainRouter = express.Router();

mainRouter.use("/", warRouter);
mainRouter.use("/", contractRouter);
mainRouter.use("/", userRouter);
mainRouter.use("/", authRouter);
mainRouter.use("/test", (req, res) => res.status(200).send("OK"));
