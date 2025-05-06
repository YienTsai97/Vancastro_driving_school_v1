"use server";

import { auth } from "@clerk/nextjs/server";

/**
 * Get QuickBooks auth URI to redirect user to QuickBooks login page
 */
export const getServices = async () => {
  try {
    // Get clerk id
    const { userId } = await auth();
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const response = await fetch(
      `${process.env.API_URL}/api/v1/oauth/services`,
      {
        method: "GET",
        headers: {
          "X-Clerk-User-Id": userId,
          Accept: "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Error getting auth URI: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error getting auth URI:", error);
    throw error;
  }
};

export const getQbItems = async () => {
  try {
    const { getToken } = await auth();
    const token = await getToken();

    const response = await fetch(
      `${process.env.API_URL}/api/v1/lesson-types/qb/items`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      return {
        success: false,
        message: `Error: ${response.status} ${response.statusText}`,
      };
    }
    return await response.json();
  } catch (error) {
    console.error("Error getting qb items:", error);
    throw error;
  }
};
