//route that allows to generate the pdf for download
import { Router } from "express";
import pdfController from "../controllers/pdf.controller";

const pdfRouter = Router();

pdfRouter.get("/", pdfController.createPDF);
