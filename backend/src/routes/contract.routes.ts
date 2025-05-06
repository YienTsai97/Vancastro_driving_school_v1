import { Router } from "express";
import contractController from "../controllers/contract.controller";

export const contractRouter = Router();

contractRouter.get("/", contractController.getContracts);
contractRouter.get("/:id", contractController.getContractById);
// contractRouter.get("/user/:id", contractController.getContractsByUserId);

contractRouter.post("/", contractController.createContract);
contractRouter.patch("/:id", contractController.editContract);
contractRouter.delete("/:id", contractController.deleteContract);

