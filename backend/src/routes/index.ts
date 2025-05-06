import { Router } from "express";
import { oauthRouter } from "./oauth.routes";
import { protectedRouter } from "./portected-routes";

export const v1router = Router();

// api/v1
v1router.use("/oauth", oauthRouter);

v1router.use("/", protectedRouter);
