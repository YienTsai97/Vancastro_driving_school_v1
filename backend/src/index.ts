import cors from "cors";
import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import { v1router } from "./routes";

const app = express();
//middleware
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

//routes
app.use("/api/v1", v1router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
