import cors from "cors";
import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import { v1router } from "./routes";

const app = express();
//middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);

app.use(express.json());

//routes
app.use("/api/v1", v1router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}.`);
});

// Deployed Server test
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function testDBConnection() {
  try {
    await prisma.$connect();
    console.log('✅ Successfully connected to Render PostgreSQL!');
  } catch (error) {
    console.error('❌ Failed to connect to Render PostgreSQL:', error);
  }
}
testDBConnection();