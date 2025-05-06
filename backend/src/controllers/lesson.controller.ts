import { LessonStatus, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const include = {
  instructor: {
    select: {
      firstName: true,
      lastName: true,
    },
  },
  student: {
    select: {
      firstName: true,
      lastName: true,
    },
  },
  lessonType: {
    select: {
      lessonName: true,
      price: true,
      lessonLength: true,
    },
  },
};

const getLessons = async (req: Request, res: Response) => {
  try {
    const lessons = await prisma.lesson.findMany({
      include: include,
    });
    res.status(200).json({ success: true, data: lessons });
  } catch (error) {
    console.error("Error fetching lessons:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getLessonById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const lesson = await prisma.lesson.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: include,
    });
    if (!lesson) {
      res.status(404).json({ success: false, message: "Lesson not found" });
      return;
    }
    res.status(200).json({ success: true, data: lesson });
  } catch (error) {
    console.error("Error fetching lesson by id:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getLessonsByStudentId = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const lessons = await prisma.lesson.findMany({
      where: {
        studentId: Number(req.params.id),
      },
      include: include,
    });
    if (!lessons) {
      res.status(404).json({ success: false, message: "Lessons not found" });
      return;
    }
    res.status(200).json({ success: true, data: lessons });
  } catch (error) {
    console.error("Error fetching lessons by student id:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getLessonsByInstructorId = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const lessons = await prisma.lesson.findMany({
      where: {
        instructorId: Number(req.params.id),
      },
      include: include,
    });
    if (!lessons) {
      res.status(404).json({ success: false, message: "Lessons not found" });
      return;
    }
    res.status(200).json({ success: true, data: lessons });
  } catch (error) {
    console.error("Error fetching lessons by instructor id:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// const getLessonsByUserEmail = async (req: Request<{ email: string }>, res: Response) => {
//   try {
//     const lessons = await prisma.lesson.findMany({
//       where: {
//         student: {
//           email: req.params.email,
//         },
//       },
//     });
//     if (!lessons) {
//       res.status(400).json({ success: false, message: "Lesson not found" });
//       return;
//     }
//     res.status(200).json({ success: true, data: lessons });
//   } catch (error) {
//     res.status(400).json({ success: false, message: "Fetching lessons by user email" });
//   }
// };

const createLesson = async (req: Request, res: Response) => {
  try {
    const {
      studentId,
      instructorId,
      lessonTypeId,
      startTime,
      endTime,
      status,
      location,
      invoiceId,
    } = req.body;
    if (
      !studentId ||
      !instructorId ||
      !lessonTypeId ||
      !startTime ||
      !endTime ||
      !status ||
      !location ||
      !invoiceId
    ) {
      res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
      return;
    }

    const lesson = await prisma.lesson.create({
      data: {
        studentId,
        instructorId,
        lessonTypeId,
        startTime,
        endTime,
        status,
        location,
        invoiceId,
      },
      include: include,
    });
    res.status(201).json({ success: true, data: lesson });
  } catch (error) {
    console.error("Error creating lesson:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const editLesson = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { studentId, instructorId, startTime, endTime, status, location } =
      req.body;
    const lesson = await prisma.lesson.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        studentId,
        instructorId,
        startTime,
        endTime,
        status,
        location,
      },
      include: include,
    });
    if (!lesson) {
      res.status(404).json({ success: false, message: "Lesson not found" });
      return;
    }
    res.status(200).json({ success: true, data: lesson });
  } catch (error) {
    console.error("Error editing lesson:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const deleteLesson = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const lesson = await prisma.lesson.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json({ success: true, data: lesson.id });
  } catch (error) {
    console.error("Error deleting lesson:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//getLessonsByStatus
const getLessonsByStatus = async (
  req: Request<{ status: LessonStatus }>,
  res: Response
) => {
  try {
    const { status } = req.params;
    const lesson = await prisma.lesson.findMany({
      where: {
        status: status,
      },
      include: include,
    });
    if (!lesson) {
      res.status(404).json({ success: false, message: "Lesson not found" });
      return;
    }
    res.status(200).json({ success: true, data: lesson });
  } catch (error) {
    console.error("Error fetching lesson by status:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export default {
  getLessons,
  getLessonById,
  getLessonsByStudentId,
  getLessonsByInstructorId,
  // getLessonsByUserEmail,
  getLessonsByStatus,
  createLesson,
  editLesson,
  deleteLesson,
};
