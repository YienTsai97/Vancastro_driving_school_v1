"use server";
import { ApiResponse } from "@/types/fetcher";
import {
  PayerRequestData,
  PayerResponseData,
  PayerType,
} from "@/types/payer.types";
import { auth } from "@clerk/nextjs/server";

/**
 * Fetch payer by ID
 * @param id {number} - The ID of the payer in database to fetch
 * @returns {Promise<ApiResponse<PayerResponseData>>}
 */
export const getPayerById = async (
  id: number
): Promise<ApiResponse<PayerResponseData>> => {
  try {
    const { getToken } = await auth();
    const token = await getToken();

    const response = await fetch(
      `${process.env.API_URL}/api/v1/payers/${id}/sync`,
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
    console.error(error);
    return { success: false, message: "Error: Unable to fetch payer by id" };
  }
};

/**
 * Fetch database payer by ID
 * @param id {number} - The ID of the payer in database to fetch
 * @returns {Promise<ApiResponse<PayerType>>}
 */
export const getDbPayerById = async (
  id: number
): Promise<ApiResponse<PayerType>> => {
  try {
    const { getToken } = await auth();
    const token = await getToken();

    const response = await fetch(`${process.env.API_URL}/api/v1/payers/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      return {
        success: false,
        message: `Error: ${response.status} ${response.statusText}`,
      };
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error: Unable to fetch payer by id" };
  }
};

/**
 * Create payer
 * @param payerData {PayerRequestData} - The payer object to create
 * @returns {Promise<ApiResponse<PayerResponseData>>}
 */
export const createPayer = async (
  payerData: PayerRequestData
): Promise<ApiResponse<PayerResponseData>> => {
  try {
    const { getToken } = await auth();
    const token = await getToken();

    const response = await fetch(`${process.env.API_URL}/api/v1/payers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payerData),
    });
    if (!response.ok) {
      return {
        success: false,
        message: `Error: ${response.status} ${response.statusText}`,
      };
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error: Unable to create payer" };
  }
};

/**
 * Create payer in database
 * @param payerData {Partial<PayerRequestData>} - The payer object to create
 * @returns {Promise<ApiResponse<PayerType>>}
 */
export const createPayerInDb = async (
  payerData: Partial<PayerRequestData>
): Promise<ApiResponse<PayerType>> => {
  try {
    const { getToken } = await auth();
    const token = await getToken();

    const response = await fetch(`${process.env.API_URL}/api/v1/payers/db`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payerData),
    });
    if (!response.ok) {
      return {
        success: false,
        message: `Error: ${response.status} ${response.statusText}`,
      };
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error: Unable to create payer" };
  }
};
