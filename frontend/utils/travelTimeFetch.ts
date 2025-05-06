"use server";
import { ApiResponse } from "@/types/fetcher";
import { auth } from "@clerk/nextjs/server";
import { TravelTimeRequestData, TravelTimeType } from "../types/travelTime.type";

export const getTravelTimes = async (): Promise<ApiResponse<TravelTimeType[]>> => {
  try {
    const { getToken } = await auth();
    const token = await getToken();

    const res = await fetch(`${process.env.API_URL}/api/v1/travel-times/`, {
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
    return { success: false, message: "Error: Unable to fetch travel times" };
  }
};

export const getTravelTimeById = async (id: number): Promise<ApiResponse<TravelTimeType>> => {
  try {
    const { getToken } = await auth();
    const token = await getToken();

    const res = await fetch(`${process.env.API_URL}/api/v1/travel-times/${id}`, {
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
    return { success: false, message: "Error: Unable to fetch travel time by id" };
  }
};

export const createTravelTime = async (travelTimeData: TravelTimeRequestData): Promise<ApiResponse<TravelTimeType>> => {
  try {
    const { getToken } = await auth();
    const token = await getToken();

    const res = await fetch(`${process.env.API_URL}/api/v1/travel-times/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(travelTimeData),
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
    return { success: false, message: "Error: Unable to create travel time" };
  }
};

export const updateTravelTime = async (
  id: number,
  travelTimeData: Partial<TravelTimeRequestData>
): Promise<ApiResponse<TravelTimeType>> => {
  try {
    const { getToken } = await auth();
    const token = await getToken();

    const res = await fetch(`${process.env.API_URL}/api/v1/travel-times/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(travelTimeData),
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
    return { success: false, message: "Error: Unable to update travel time" };
  }
};

export const deleteTravelTime = async (id: number): Promise<ApiResponse<number>> => {
  try {
    const { getToken } = await auth();
    const token = await getToken();

    const res = await fetch(`${process.env.API_URL}/api/v1/travel-times/${id}`, {
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
    return { success: false, message: "Error: Unable to delete travel time" };
  }
};
