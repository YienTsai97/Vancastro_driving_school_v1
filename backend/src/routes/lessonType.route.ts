import { Router } from "express";
import lessonTypeController from "../controllers/lessonType.controller";

export const lessonTypeRouter = Router();

lessonTypeRouter.get("/", lessonTypeController.getLessonTypes);
lessonTypeRouter.get("/qb/items", lessonTypeController.getQbItems);
lessonTypeRouter.get("/:id", lessonTypeController.getLessonTypeById);

lessonTypeRouter.post("/", lessonTypeController.createLessonType);
lessonTypeRouter.patch("/:id", lessonTypeController.updataLessonType);
lessonTypeRouter.delete("/:id", lessonTypeController.deleteLessonType);
