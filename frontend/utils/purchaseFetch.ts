'use server';
import { ApiResponse } from '@/types/fetcher';
import { auth } from '@clerk/nextjs/server';
import {
  PurchaseItemRequestData,
  PurchaseItemType,
  PurchaseRequestData,
  PurchaseType,
} from '../types/purchase.type';

export const getPurchases = async (): Promise<ApiResponse<PurchaseType[]>> => {
  try {
    const { getToken } = await auth();
    const token = await getToken();

    const res = await fetch(`${process.env.API_URL}/api/v1/purchases/`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
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
    return { success: false, message: 'Error: Unable to fetch purchases' };
  }
};

export const getPurchaseById = async (
  id: number
): Promise<ApiResponse<PurchaseType>> => {
  try {
    const { getToken } = await auth();
    const token = await getToken();

    const res = await fetch(`${process.env.API_URL}/api/v1/purchases/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
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
    return { success: false, message: 'Error: Unable to fetch purchase by id' };
  }
};

export const createPurchase = async (
  purchaseData: PurchaseRequestData
): Promise<ApiResponse<PurchaseType>> => {
  try {
    const { getToken } = await auth();
    const token = await getToken();

    const res = await fetch(`${process.env.API_URL}/api/v1/purchases/`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(purchaseData),
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
    return { success: false, message: 'Error: Unable to create purchase' };
  }
};

export const updatePurchase = async (
  id: number,
  purchaseData: Partial<PurchaseRequestData>
): Promise<ApiResponse<PurchaseType>> => {
  try {
    const { getToken } = await auth();
    const token = await getToken();

    const res = await fetch(`${process.env.API_URL}/api/v1/purchases/${id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(purchaseData),
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
    return { success: false, message: 'Error: Unable to update purchase' };
  }
};

export const updatePurchaseItem = async (
  id: number,
  purchaseItemData: Partial<PurchaseItemRequestData>
): Promise<ApiResponse<PurchaseItemType>> => {
  try {
    const { getToken } = await auth();
    const token = await getToken();

    const res = await fetch(
      `${process.env.API_URL}/api/v1/purchases/item/${id}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(purchaseItemData),
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
    return { success: false, message: 'Error: Unable to update purchase item' };
  }
};

export const deletePurchase = async (
  id: number
): Promise<ApiResponse<number>> => {
  try {
    const { getToken } = await auth();
    const token = await getToken();

    const res = await fetch(`${process.env.API_URL}/api/v1/purchases/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
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
    return { success: false, message: 'Error: Unable to delete purchase' };
  }
};
