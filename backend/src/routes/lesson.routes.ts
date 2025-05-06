import { Router } from "express";
import lessonController from "../controllers/lesson.controller";

export const lessonRouter = Router();

lessonRouter.get("/status/:status", lessonController.getLessonsByStatus);
lessonRouter.get("/", lessonController.getLessons);
lessonRouter.get("/:id", lessonController.getLessonById);
lessonRouter.get("/student/:id", lessonController.getLessonsByStudentId);
lessonRouter.get("/instructor/:id", lessonController.getLessonsByInstructorId);
// lessonRouter.get("/user/email/:email", lessonController.getLessonsByUserEmail);

lessonRouter.post("/", lessonController.createLesson);
lessonRouter.put("/:id", lessonController.editLesson);
lessonRouter.delete("/:id", lessonController.deleteLesson);
