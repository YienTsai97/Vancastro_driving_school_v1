import { Request, Response } from "express";
import { generatePDF } from "../pdfkit";

const createPDF = async (req: Request, res: Response) => {
  try {
    const pdf = generatePDF();
    //need to get clerk user id, user full name, contrct type, siganture, date of signature
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, message: "Error: Creating PDF" });
  }
};

export default {
  createPDF,
};
