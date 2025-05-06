"use server";
import { ApiResponse } from "@/types/fetcher";
import {
  InvoiceRequestData,
  InvoiceResponseData,
  InvoiceType,
} from "@/types/invoice.type";
import { auth } from "@clerk/nextjs/server";


/**
 * Fetch all invoices
 * @returns {Promise<ApiResponse<InvoiceType[]>>}
 */
export const getInvoices = async (): Promise<ApiResponse<InvoiceType[]>> => {
  try {
    const { getToken } = await auth();  
    const token = await getToken();
    const response = await fetch(`${process.env.API_URL}/api/v1/invoices`, {
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
    return { success: false, message: "Error: Unable to fetch invoices" };
  }
};

/**
 * Fetch invoice by ID
 * @param id {number} - The ID of the invoice in database to fetch
 * @returns {Promise<ApiResponse<InvoiceResponseData>>}
 */
export const getInvoiceById = async (
  id: number
): Promise<ApiResponse<InvoiceResponseData>> => {
  try {
    const { getToken } = await auth();
    const token = await getToken();

    const response = await fetch(
      `${process.env.API_URL}/api/v1/invoices/${id}`,
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
    return { success: false, message: "Error: Unable to fetch invoice by id" };
  }
};

/**
 * Fetch invoices by user ID
 * @param userId {number} - The ID of the user in database to fetch invoices
 * @returns {Promise<ApiResponse<InvoiceType[]>>}
 */
export const getInvoicesByUserId = async (
  userId: number
): Promise<ApiResponse<InvoiceType[]>> => {
  try {
    const { getToken } = await auth();
    const token = await getToken();

    const response = await fetch(
      `${process.env.API_URL}/api/v1/invoices/user/${userId}`,
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
    return {
      success: false,
      message: "Error: Unable to fetch invoices by user id",
    };
  }
};

/**
 * Create invoice
 * @param invoiceData {InvoiceRequestData} - The invoice object to create
 * @returns {Promise<ApiResponse<InvoiceResponseData>>}
 */
export const createInvoice = async (
  invoiceData: InvoiceRequestData
): Promise<ApiResponse<InvoiceResponseData>> => {
  try {
    const { getToken } = await auth();
    const token = await getToken();

    const response = await fetch(`${process.env.API_URL}/api/v1/invoices`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(invoiceData),
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
    return { success: false, message: "Error: Unable to create invoice" };
  }
};

// /**
//  * Update invoice in database
//  * @param id {number} - The ID of the invoice in database to update
//  * @param invoiceData {Partial<InvoiceRequestData>} - The invoice object to update
//  * @returns {Promise<ApiResponse<InvoiceType>>}
//  */
// export const updateInvoiceInDatabase = async (
//   id: number,
//   invoiceData: Partial<InvoiceRequestData>
// ): Promise<ApiResponse<InvoiceType>> => {
//   try {
//     const { getToken } = await auth();
//     const token = await getToken();

//     const response = await fetch(
//       `${process.env.API_URL}/api/v1/invoices/${id}`,
//       {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(invoiceData),
//       }
//     );
//     if (!response.ok) {
//       return {
//         success: false,
//         message: `Error: ${response.status} ${response.statusText}`,
//       };
//     }
//     return await response.json();
//   } catch (error) {
//     console.error(error);
//     return {
//       success: false,
//       message: "Error: Unable to update invoice in database",
//     };
//   }
// };

/**
 * Update invoice
 * @param id {number} - The ID of the invoice in database to update
 * @param invoiceData {Partial<InvoiceRequestData>} - The invoice object to update
 * @returns {Promise<ApiResponse<InvoiceResponseData | InvoiceType>>}
 */
export const updateInvoice = async (
  id: number,
  invoiceData: Partial<InvoiceRequestData>
): Promise<ApiResponse<InvoiceResponseData | InvoiceType>> => {
  try {
    const { getToken } = await auth();
    const token = await getToken();

    const response = await fetch(
      `${process.env.API_URL}/api/v1/invoices/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(invoiceData),
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
    return {
      success: false,
      message: "Error: Unable to update invoice in QuickBooks",
    };
  }
};

// Delete invoice response data type
type DeleteInvoiceResponse = {
  invoiceId: number;
  qbInvoiceId: string;
};

/**
 * Delete invoice
 * @param id {number} - The ID of the invoice in database to delete
 * @returns {Promise<ApiResponse<DeleteInvoiceResponse>>}
 */
export const deleteInvoice = async (
  id: number
): Promise<ApiResponse<DeleteInvoiceResponse>> => {
  try {
    const { getToken } = await auth();
    const token = await getToken();

    const response = await fetch(
      `${process.env.API_URL}/api/v1/invoices/${id}`,
      {
        method: "DELETE",
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
    return { success: false, message: "Error: Unable to delete invoice" };
  }
};
