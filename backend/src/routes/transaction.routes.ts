import { Router } from "express";
import transactionController from "../controllers/transaction.controller";

export const transactionRouter = Router();

transactionRouter.get("/", transactionController.getTransactions);
transactionRouter.get("/:id", transactionController.getTransactionById);

transactionRouter.post("/", transactionController.createTransaction);
transactionRouter.put("/:id", transactionController.editTransaction);
transactionRouter.delete("/:id", transactionController.deleteTransaction);
