import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const include = {
  user: true,
  items: {
    include: {
      lessonType: true,
    },
  },
};

const getPurchases = async (req: Request, res: Response) => {
  try {
    const purchases = await prisma.purchase.findMany({
      include,
    });
    const serializedPurchases = purchases.map((purchase) => ({
      ...purchase,
      user: {
        ...purchase.user,
        email: purchase.user.email,
        firstName: purchase.user.firstName,
        lastName: purchase.user.lastName,
      },
      items: purchase.items.map((item) => ({
        ...item,
        unitPrice: Number(item.unitPrice),
        lessonType: {
          ...item.lessonType,
          price: Number(item.lessonType.price),
        },
      })),
    }));
    res.status(200).json({ success: true, data: serializedPurchases });
  } catch (err) {
    console.error("Error fetching purchases:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getPurchaseById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!id) {
      res.status(400).json({ success: false, message: "ID is required" });
      return;
    }

    const purchase = await prisma.purchase.findUnique({
      where: { id: id },
      include,
    });
    if (!purchase) {
      res.status(404).json({ success: false, message: "Purchase not found" });
      return;
    }

    const serializedPurchase = {
      ...purchase,
      user: {
        ...purchase.user,
        email: purchase.user.email,
        firstName: purchase.user.firstName,
        lastName: purchase.user.lastName,
      },
      items: purchase.items.map((item) => ({
        ...item,
        unitPrice: Number(item.unitPrice),
        lessonType: {
          ...item.lessonType,
          price: Number(item.lessonType.price),
        },
      })),
    };
    res.status(200).json({ success: true, data: serializedPurchase });
  } catch (err) {
    console.error("Error fetching purchase by id:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const createPurchase = async (req: Request, res: Response) => {
  try {
    const { userId, payerId, licenseClass, status, purchaseItems } = req.body;
    if (!userId || !payerId || !licenseClass || !status || !purchaseItems) {
      res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
      return;
    }

    let newPurchaseId: number | undefined;

    await prisma.$transaction(async (tx) => {
      // Create purchase
      const newPurchase = await tx.purchase.create({
        data: {
          userId,
          payerId,
          licenseClass,
          status,
        },
        include,
      });

      // Create purchase items
      await Promise.all(
        purchaseItems.map(
          (item: {
            lessonTypeId: number;
            quantity: number;
            unitPrice: number;
          }) =>
            tx.purchaseItem.create({
              data: {
                purchaseId: newPurchase.id,
                lessonTypeId: item.lessonTypeId,
                quantity: item.quantity,
                unitPrice: item.unitPrice,
              },
            })
        )
      );

      newPurchaseId = newPurchase.id;
    });

    if (!newPurchaseId) {
      res
        .status(500)
        .json({ success: false, message: "Error creating purchase" });
      return;
    }

    // Re-fetch purchase to include items
    const createdPurchase = await prisma.purchase.findUnique({
      where: { id: newPurchaseId },
      include,
    });
    if (!createdPurchase) {
      res
        .status(500)
        .json({ success: false, message: "Error fetching created purchase" });
      return;
    }

    const serializedPurchase = {
      ...createdPurchase,
      items: createdPurchase.items.map((item) => ({
        ...item,
        unitPrice: Number(item.unitPrice),
        lessonType: {
          ...item.lessonType,
          price: Number(item.lessonType.price),
        },
      })),
    };
    res.status(201).json({ success: true, data: serializedPurchase });
  } catch (err) {
    console.error("Error creating purchase:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const updatePurchase = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!id) {
      res.status(400).json({ success: false, message: "ID is required" });
      return;
    }

    const { licenseClass, status } = req.body;
    const purchase = await prisma.purchase.update({
      where: { id },
      data: {
        licenseClass,
        status,
      },
      include,
    });
    if (!purchase) {
      res.status(404).json({ success: false, message: "Purchase not found" });
      return;
    }

    const serializedPurchase = {
      ...purchase,
      items: purchase.items.map((item) => ({
        ...item,
        unitPrice: Number(item.unitPrice),
        lessonType: {
          ...item.lessonType,
          price: Number(item.lessonType.price),
        },
      })),
    };
    res.status(200).json({ success: true, data: serializedPurchase });
  } catch (err) {
    console.error("Error upDating purchase:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const updatePurchaseItem = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!id) {
      res.status(400).json({ success: false, message: "ID is required" });
      return;
    }

    const { lessonTypeId, quantity, unitPrice } = req.body;
    const purchaseItem = await prisma.purchaseItem.update({
      where: { id },
      data: {
        lessonTypeId,
        quantity,
        unitPrice,
      },
      include: {
        lessonType: true,
      },
    });
    if (!purchaseItem) {
      res
        .status(404)
        .json({ success: false, message: "Purchase item not found" });
      return;
    }

    const serializedPurchaseItem = {
      ...purchaseItem,
      unitPrice: Number(purchaseItem.unitPrice),
      lessonType: {
        ...purchaseItem.lessonType,
        price: Number(purchaseItem.lessonType.price),
      },
    };
    res.status(200).json({ success: true, data: serializedPurchaseItem });
  } catch (err) {
    console.error("Error updating purchase item:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const deletePurchase = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!id) {
      res.status(400).json({ success: false, message: "ID is required" });
      return;
    }

    const purchase = await prisma.purchase.delete({
      where: { id },
    });
    if (!purchase) {
      res.status(404).json({ success: false, message: "Purchase not found" });
      return;
    }
    res.status(200).json({ success: true, data: purchase.id });
  } catch (err) {
    console.error("Error deleting purchase:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export default {
  getPurchases,
  getPurchaseById,
  createPurchase,
  updatePurchase,
  updatePurchaseItem,
  deletePurchase,
};
