"use server";
import { ApiResponse } from "@/types/fetcher";
import { auth } from "@clerk/nextjs/server";
import {
  LessonRequestData,
  LessonStatus,
  LessonType,
} from "../types/lesson.type";

/**
 * Fetches all lessons
 * @returns {Promise<ApiResponse<LessonType[]>>}
 */
export const getLessons = async (): Promise<ApiResponse<LessonType[]>> => {
  try {
    const { getToken } = await auth();
    const token = await getToken();

    const res = await fetch(`${process.env.API_URL}/api/v1/lessons/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      return {
        success: false,
        message: `Error: ${res.status} ${res.statusText}`,
      };
    }
    return await res.json();
  } catch (err) {
    console.error(err);
    return { success: false, message: "Error: Unable to fetch lessons" };
  }
};

/**
 * Fetch lesson by ID
 * @param id {number} - The ID of the lesson to fetch
 * @returns {Promise<ApiResponse<LessonType>>}
 */
export const getLessonById = async (
  id: number
): Promise<ApiResponse<LessonType>> => {
  try {
    const { getToken } = await auth();
    const token = await getToken();

    const res = await fetch(`${process.env.API_URL}/api/v1/lessons/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      return {
        success: false,
        message: `Error: ${res.status} ${res.statusText}`,
      };
    }
    return await res.json();
  } catch (err) {
    console.error(err);
    return { success: false, message: "Error: Unable to fetch lesson by id" };
  }
};

/**
 * Fetch lessons by student ID
 * @param studentId {number} - The ID of the student to fetch lessons for
 * @returns {Promise<ApiResponse<LessonType[]>>}
 */
export const getLessonsByStudentId = async (
  studentId: number
): Promise<ApiResponse<LessonType[]>> => {
  try {
    const { getToken } = await auth();
    const token = await getToken();

    const res = await fetch(
      `${process.env.API_URL}/api/v1/lessons/student/${studentId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) {
      return {
        success: false,
        message: `Error: ${res.status} ${res.statusText}`,
      };
    }
    return await res.json();
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: "Error: Unable to fetch lessons by student id",
    };
  }
};

/**
 * Fetch lessons by instructor ID
 * @param instructorId {number} - The ID of the instructor to fetch lessons for
 * @returns {Promise<ApiResponse<LessonType[]>>}
 */
export const getLessonsByInstructorId = async (
  instructorId: number
): Promise<ApiResponse<LessonType[]>> => {
  try {
    const { getToken } = await auth();
    const token = await getToken();

    const res = await fetch(
      `${process.env.API_URL}/api/v1/lessons/instructor/${instructorId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) {
      return {
        success: false,
        message: `Error: ${res.status} ${res.statusText}`,
      };
    }
    return await res.json();
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: "Error: Unable to fetch lessons by instructor id",
    };
  }
};

/**
 * Create lesson
 * @param lessonData {LessonRequestData} - The lesson object to create
 * @returns {Promise<ApiResponse<LessonType>>}
 */
export const createLesson = async (
  lessonData: LessonRequestData
): Promise<ApiResponse<LessonType>> => {
  try {
    const { getToken } = await auth();
    const token = await getToken();

    const res = await fetch(`${process.env.API_URL}/api/v1/lessons/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lessonData),
    });
    if (!res.ok) {
      return {
        success: false,
        message: `Error: ${res.status} ${res.statusText}`,
      };
    }
    console.log("createLesson success!");
    return await res.json();
  } catch (err) {
    console.error(err);
    return { success: false, message: "Error: Unable to create lesson" };
  }
};

/**
 * Update lesson
 * @param id {number} - The ID of the lesson to update
 * @param lessonData {Partial<LessonRequestData>} - The lesson object to update
 * @returns {Promise<ApiResponse<LessonType>>}
 */
export const updateLesson = async (
  id: number,
  lessonData: Partial<LessonRequestData>
): Promise<ApiResponse<LessonType>> => {
  try {
    const { getToken } = await auth();
    const token = await getToken();

    const res = await fetch(`${process.env.API_URL}/api/v1/lessons/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lessonData),
    });
    if (!res.ok) {
      return {
        success: false,
        message: `Error: ${res.status} ${res.statusText}`,
      };
    }
    return await res.json();
  } catch (err) {
    console.error(err);
    return { success: false, message: "Error: Unable to update lesson" };
  }
};

/**
 * Delete lesson
 * @param id {number} - The ID of the lesson to delete
 * @returns {Promise<ApiResponse<number>>}
 */
export const deleteLesson = async (
  id: number
): Promise<ApiResponse<number>> => {
  try {
    const { getToken } = await auth();
    const token = await getToken();

    const res = await fetch(`${process.env.API_URL}/api/v1/lessons/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      return {
        success: false,
        message: `Error: ${res.status} ${res.statusText}`,
      };
    }
    return await res.json();
  } catch (err) {
    console.error(err);
    return { success: false, message: "Error: Unable to delete lesson" };
  }
};

/**
 * Fetch lessons by Status
 * @param status {string} - The ID of the lesson to fetch
 * @returns {Promise<LessonType[] | null>} - The lesson object or null if there was an error
 */
export const getLessonsByStatus = async (
  status: LessonStatus
): Promise<ApiResponse<LessonType[]>> => {
  try {
    const { getToken } = await auth();
    const token = await getToken();

    const res = await fetch(
      `${process.env.API_URL}/api/v1/lessons/status/${status}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: "Error: Unable to get lessons by status.",
    };
  }
};
