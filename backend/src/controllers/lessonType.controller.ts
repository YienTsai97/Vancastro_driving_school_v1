import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { getQbo } from "../api/qbo";
import { ensureQuickBooksAuthorization } from "../api/quickbooksAuth";

const prisma = new PrismaClient();

const getLessonTypes = async (req: Request, res: Response) => {
  try {
    const lessonTypes = await prisma.lessonType.findMany();
    // convert Decimal to number
    const serializedLessonTypes = lessonTypes.map((lesson) => ({
      ...lesson,
      price: Number(lesson.price),
    }));
    res.status(200).json({ success: true, data: serializedLessonTypes });
  } catch (error) {
    console.error("Error fetching lessonTypes:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getQbItems = async (req: Request, res: Response) => {
  try {
    // const clerkId = req.auth.userId;
    // if (!clerkId) {
    //   res.status(401).json({ success: false, message: 'Unauthorized' });
    //   return;
    // }

    // const dbUser = await prisma.user.findUnique({
    //   where: { clerkId },
    // });
    // if (!dbUser) {
    //   res.status(404).json({ success: false, message: 'User not found' });
    //   return;
    // }

    // Ensure QuickBooks authorization
    const tokenData = await ensureQuickBooksAuthorization(req, res);
    if (!tokenData) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    // Fetch items from QuickBooks
    const qbo = await getQbo(tokenData.accessToken, tokenData.refreshToken);
    const qbItems = (await new Promise((resolve, reject) => {
      qbo.findItems({}, (error: Error, response: any) => {
        if (error) {
          console.error("QuickBooks API Error:", error);
          reject(error);
        } else resolve(response);
      });
    })) as any;
    if (!qbItems) {
      res.status(404).json({ success: false, message: "No items found" });
      return;
    }
    // Filter and format items
    const returnItems = qbItems.QueryResponse.Item;
    res.status(200).json({
      success: true,
      data: returnItems,
    });
  } catch (error) {
    console.error("Error fetching qb items:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getLessonTypeById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!id) {
      res.status(400).json({ success: false, message: "ID is required" });
      return;
    }

    const lessonType = await prisma.lessonType.findUnique({
      where: { id },
    });
    if (!lessonType) {
      res
        .status(404)
        .json({ success: false, message: "Lesson Type not found" });
      return;
    }
    res.status(200).json({
      success: true,
      data: { ...lessonType, price: Number(lessonType.price) },
    });
  } catch (error) {
    console.error("Error fetching lessonType by id:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const createLessonType = async (req: Request, res: Response) => {
  try {
    const {
      qbServiceId,
      lessonName,
      licenseClass,
      lessonLength,
      count,
      price,
    } = req.body;
    if (!lessonName || !licenseClass || !lessonLength || !count || !price) {
      res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
      return;
    }

    const lesson = await prisma.lessonType.create({
      data: {
        qbServiceId,
        lessonName,
        licenseClass,
        lessonLength,
        count,
        price,
      },
    });
    res.status(201).json({
      success: true,
      data: { ...lesson, price: Number(lesson.price) },
    });
  } catch (error) {
    console.error("Error creating lesson type:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const updataLessonType = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!id) {
      res.status(400).json({ success: false, message: "ID is required" });
      return;
    }

    const existing = await prisma.lessonType.findUnique({
      where: { id: id },
    });

    if (!existing) {
      res
        .status(404)
        .json({ success: false, message: "Lesson Type not found" });
      return;
    }

    const {
      qbServiceId,
      lessonName,
      licenseClass,
      lessonLength,
      count,
      price,
    } = req.body;

    const updatedLessonType = await prisma.lessonType.update({
      where: { id: id },
      data: {
        qbServiceId,
        lessonName,
        licenseClass,
        lessonLength,
        count,
        price,
      },
    });

    res.status(200).json({
      success: true,
      data: { ...updatedLessonType, price: Number(updatedLessonType.price) },
    });
  } catch (error) {
    console.error("Error updating lesson type:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const deleteLessonType = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!id) {
      res.status(400).json({ success: false, message: "ID is required" });
      return;
    }

    const lessonType = await prisma.lessonType.delete({
      where: { id: id },
    });
    if (!lessonType) {
      res
        .status(404)
        .json({ success: false, message: "Lesson Type not found" });
      return;
    }
    res.status(200).json({ success: true, data: lessonType.id });
  } catch (err) {
    console.error("Error deleting lesson type:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export default {
  getLessonTypes,
  getQbItems,
  getLessonTypeById,
  createLessonType,
  updataLessonType,
  deleteLessonType,
};
