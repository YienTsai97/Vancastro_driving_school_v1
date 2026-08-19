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

const getRecentApprovedLessonsByInstructorId = async (
  req: Request<{ id: string }, unknown, unknown, {
    status?: LessonStatus;
    from?: string;      // YYYY-MM-DD
    to?: string;        // optional
    page?: string;      // "1"
    pageSize?: string;  // "20"
  }>,
  res: Response
) => {
  try {
    const instructorId = Number(req.params.id);
    const { status, from, to, page = "1", pageSize = "20" } = req.query;

    const pageNum = Math.max(1, Number(page) || 1);
    const sizeNum = Math.min(100, Math.max(1, Number(pageSize) || 20));
    const skip = (pageNum - 1) * sizeNum;

    const where: any = { instructorId };

    if (status) {
      where.status = status;
    }

    if (from || to) {
      where.startTime = {};
      if (from) where.startTime.gte = new Date(`${from}T00:00:00.000Z`);
      if (to) where.startTime.lte = new Date(`${to}T23:59:59.999Z`);
    }

    const [lessons, total] = await Promise.all([
      prisma.lesson.findMany({
        where,
        include,
        orderBy: { startTime: "asc" },
        skip,
        take: sizeNum,
      }),
      prisma.lesson.count({ where }),
    ]);

    res.status(200).json({
      success: true,
      data: lessons,
      pagination: {
        page: pageNum,
        pageSize: sizeNum,
        total,
        totalPages: Math.ceil(total / sizeNum),
        hasNextPage: pageNum * sizeNum < total,
      },
    });
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
  getRecentApprovedLessonsByInstructorId,
  // getLessonsByUserEmail,
  getLessonsByStatus,
  createLesson,
  editLesson,
  deleteLesson,
};
