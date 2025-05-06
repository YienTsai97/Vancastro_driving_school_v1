import { Router } from "express";
import invoiceController from "../controllers/invoice.controller";

export const invoiceRouter = Router();

invoiceRouter.get("/", invoiceController.getInvoices);
invoiceRouter.get("/:id", invoiceController.getInvoiceById);
invoiceRouter.get("/user/:id", invoiceController.getInvoicesByUserId);

invoiceRouter.post("/", invoiceController.createInvoice);
// invoiceRouter.put("/:id", invoiceController.editInvoiceInDatabase);
// invoiceRouter.put("/quickbooks/:id", invoiceController.editInvoiceInQuickBooks);
invoiceRouter.put("/:id", invoiceController.editInvoice);
invoiceRouter.delete("/:id", invoiceController.deleteInvoice);
