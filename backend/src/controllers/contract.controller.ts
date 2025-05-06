import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const getContracts = async (req: Request, res: Response) => {
  try {
    const contracts = await prisma.contract.findMany();
    res.status(200).json({ success: true, data: contracts });
  } catch (err) {
    console.error("Error fetching contracts:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getContractById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ success: false, message: "Invalid contract ID" });
      return;
    }
    const contract = await prisma.contract.findUnique({
      where: { id },
    });
    if (!contract) {
      res.status(404).json({ success: false, message: "Contract not found" });
      return;
    }
    res.status(200).json({ success: true, data: contract });
  } catch (err) {
    console.error("Error fetching contract:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getContractsByUserId = async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    if (!id) {
      res.status(400).json({ success: false, message: "Invalid user id" });
      return;
    }

    const contract = await prisma.contract.findMany({
      where: { userId: parseInt(id) },
    });
    res.status(200).json(contract);
  } catch (err) {
    console.error("Error fetching contracts by user id:", err);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

const createContract = async (req: Request, res: Response) => {
  try {
    const { userId, signature, licenseClass } = req.body;
    if (!userId || !signature || !licenseClass) {
      res.status(400).json({ success: false, message: "Missing required fields" });
      return;
    }

    const contract = await prisma.contract.create({
      data: {
        user: { connect: { id: userId as number } },
        signature,
        licenseClass,
      },
    });

    await prisma.user.update({
      where: { id: userId as number},
      data: { contractId: contract.id as number },
    });
    res.status(201).json({ success: true, data: contract });
  } catch (err) {
    console.error("Error creating contract:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const editContract = async (req: Request, res: Response) => {
  try {
    const { userId, signature, licenseClass } = req.body;
    const contract = await prisma.contract.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        userId,
        signature,
        licenseClass,
      },
    });
    if (!contract) {
      res.status(404).json({ success: false, message: "Contract not found" });
      return;
    }
    res.status(201).json({ success: true, data: contract });
  } catch (err) {
    console.error("Error editing contract:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const deleteContract = async (req: Request, res: Response) => {
  try {
    const contract = await prisma.contract.delete({
      where: { id: Number(req.params.id) },
    });
    if (!contract) {
      res.status(404).json({ success: false, message: "Contract not found" });
      return;
    }
    res.status(200).json({ success: true, data: contract.id });
  } catch (err) {
    console.error("Error deleting contract:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export default {
  getContracts,
  getContractById,
  getContractsByUserId,
  createContract,
  editContract,
  deleteContract,
};
