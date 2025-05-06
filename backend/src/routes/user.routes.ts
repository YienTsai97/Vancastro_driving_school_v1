import { Router } from "express";
import userController from "../controllers/user.controller";

export const userRouter = Router();

userRouter.get("/", userController.getUsers);
userRouter.get("/:id", userController.getUserById);
userRouter.get("/clerk/:clerkId", userController.getUserByClerkId);
userRouter.get("/email", userController.getUserByEmail);
userRouter.get("/instructors/all", userController.getInstructors);

userRouter.post("/", userController.createUser);
userRouter.patch("/:id", userController.updateUser);
userRouter.delete("/:id", userController.deleteUser)
