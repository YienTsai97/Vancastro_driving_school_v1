import { Router } from "express";
import payerController from "../controllers/payer.controller";

export const payerRouter = Router();

payerRouter.get("/:id/sync", payerController.getPayerById);
payerRouter.get("/:id", payerController.getDbPayerById);
payerRouter.post("/", payerController.createPayer);
payerRouter.post("/db", payerController.createPayerInDb);
