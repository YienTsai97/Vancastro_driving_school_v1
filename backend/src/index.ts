import cors from "cors";
import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { v1router } from "./routes";

const app = express();
const prisma = new PrismaClient();
//middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);

app.use(express.json());

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    service: "vancastro-backend",
    uptimeSeconds: Math.floor(process.uptime()),
  });
});

app.get("/ready", async (_req: Request, res: Response) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({ status: "ready", database: "connected" });
  } catch {
    res.status(503).json({ status: "not_ready", database: "unavailable" });
  }
});

//routes
app.use("/api/v1", v1router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}.`);
});