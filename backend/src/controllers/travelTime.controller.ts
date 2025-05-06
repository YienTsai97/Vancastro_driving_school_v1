import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const getTravelTimes = async (req: Request, res: Response) => {
  try {
    const travelTime = await prisma.travelTime.findMany();
    res.status(200).json({ success: true, data: travelTime });
  } catch (err) {
    console.error("Error getting travel times:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getTravelTimeById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!id) {
      res.status(400).json({ success: false, message: "ID is required" });
      return;
    }

    const travelTime = await prisma.travelTime.findUnique({
      where: { id },
    });
    if (!travelTime) {
      res.status(404).json({ success: false, message: "Travel Time not found" });
      return;
    }
    res.status(200).json({ success: true, data: travelTime });
  } catch (err) {
    console.error("Error getting travel time by id:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const createTravelTime = async (req: Request, res: Response) => {
  try {
    const { location1, location2, durationMinutes } = req.body;
    if (!location1 || !location2 || !durationMinutes) {
      res.status(400).json({ success: false, message: "Missing required fields" });
      return;
    }

    const travelTime = await prisma.travelTime.create({
      data: {
        location1,
        location2,
        durationMinutes,
      },
    });
    res.status(201).json({ success: true, data: travelTime });
  } catch (err) {
    console.error("Error creating travel time:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const updateTravelTime = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!id) {
      res.status(400).json({ success: false, message: "ID is required" });
      return;
    }

    const { location1, location2, durationMinutes } = req.body;

    const travelTime = await prisma.travelTime.update({
      where: { id },
      data: {
        location1,
        location2,
        durationMinutes,
      },
    });
    if (!travelTime) {
      res.status(404).json({ success: false, message: "Travel Time not found" });
      return;
    }
    res.status(200).json({ success: true, data: travelTime });
  } catch (err) {
    console.error("Error updating travel time:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const deleteTravelTime = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!id) {
      res.status(400).json({ success: false, message: "ID is required" });
      return;
    }

    const travelTime = await prisma.travelTime.delete({
      where: { id },
    });
    if (!travelTime) {
      res.status(404).json({ success: false, message: "Travel Time not found" });
      return;
    }
    res.status(200).json({ success: true, data: (await travelTime).id });
  } catch (err) {
    console.error("Error deleting travel time:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export default {
  getTravelTimes,
  getTravelTimeById,
  createTravelTime,
  updateTravelTime,
  deleteTravelTime,
};
