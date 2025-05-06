"use server";
import { ApiResponse } from "@/types/fetcher";
import { auth } from "@clerk/nextjs/server";
import { LessonTypeInterface, LessonTypeRequestData } from "../types/lessonType.type";

export const getLessonTypes = async (): Promise<ApiResponse<LessonTypeInterface[]>> => {
  try {
    const { getToken } = await auth();
    const token = await getToken();

    const res = await fetch(`${process.env.API_URL}/api/v1/lesson-types/`, {
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
    return { success: false, message: "Error: Unable to fetch lesson types" };
  }
};

export const getLessonTypeById = async (id: number): Promise<ApiResponse<LessonTypeInterface>> => {
  try {
    const { getToken } = await auth();
    const token = await getToken();

    const res = await fetch(`${process.env.API_URL}/api/v1/lesson-types/${id}`, {
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
    console.log(err);
    return { success: false, message: "Error: Unable to fetch lesson type by id" };
  }
};

export const createLessonType = async (
  lessonTypeData: LessonTypeRequestData
): Promise<ApiResponse<LessonTypeInterface>> => {
  try {
    const { getToken } = await auth();
    const token = await getToken();

    const res = await fetch(`${process.env.API_URL}/api/v1/lesson-types/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lessonTypeData),
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
    return { success: false, message: "Error: Unable to create lesson type" };
  }
};

export const updateLessonType = async (
  id: number,
  lessonTypeData: Partial<LessonTypeRequestData>
): Promise<ApiResponse<LessonTypeInterface>> => {
  try {
    const { getToken } = await auth();
    const token = await getToken();

    const res = await fetch(`${process.env.API_URL}/api/v1/lesson-types/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lessonTypeData),
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
    return { success: false, message: "Error: Unable to update lesson type" };
  }
};

export const deleteLessonType = async (id: number): Promise<ApiResponse<number>> => {
  try {
    const { getToken } = await auth();
    const token = await getToken();

    const res = await fetch(`${process.env.API_URL}/api/v1/lesson-types/${id}`, {
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
    return { success: false, message: "Error: Unable to delete lesson type" };
  }
};
