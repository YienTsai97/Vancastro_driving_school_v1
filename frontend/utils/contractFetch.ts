"use server";
import { ContractRequestData, ContractType } from "@/types/contract.type";
import { ApiResponse } from "@/types/fetcher";
import { auth } from "@clerk/nextjs/server";

export const getContracts = async (): Promise<ApiResponse<ContractType[]>> => {
  try {
    const { getToken } = await auth();
    const token = await getToken();

    const res = await fetch(`${process.env.API_URL}/api/v1/contracts`, {
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
    return { success: false, message: "Error: Unable to fetch contracts" };
  }
};

export const getContractById = async (id: number): Promise<ApiResponse<ContractType>> => {
  try {
    const { getToken } = await auth();
    const token = await getToken();

    const res = await fetch(`${process.env.API_URL}/api/v1/contracts/${id}`, {
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
    return { success: false, message: "Error: Unable to fetch contract by id" };
  }
};

export const createContract = async (contractData: ContractRequestData): Promise<ApiResponse<ContractType>> => {
  try {
    const { getToken } = await auth();
    const token = await getToken();

    const res = await fetch(`${process.env.API_URL}/api/v1/contracts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contractData),
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
    return { success: false, message: "Error: Unable to create contract" };
  }
};

export const updateContract = async (
  id: number,
  contractData: Partial<ContractType>
): Promise<ApiResponse<ContractType>> => {
  try {
    const { getToken } = await auth();
    const token = await getToken();

    const res = await fetch(`${process.env.API_URL}/api/v1/contracts/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contractData),
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
    return { success: false, message: "Error: Unable to update contract" };
  }
};

export const deleteContract = async (id: number): Promise<ApiResponse<number>> => {
  try {
    const { getToken } = await auth();
    const token = await getToken();

    const res = await fetch(`${process.env.API_URL}/api/v1/contracts/${id}`, {
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
    return { success: false, message: "Error: Unable to delete contract" };
  }
};