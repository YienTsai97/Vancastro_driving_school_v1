"use server"
import { ApiResponse } from "@/types/fetcher";
import { TransactionRequestData, TransactionType } from "@/types/transaction.type";
import { auth } from "@clerk/nextjs/server";
import { InvoiceStatus} from '@/types/invoice.type';
import { updateInvoice } from './invoiceFetch';

export const getTransactions = async (): Promise<ApiResponse<number>> => {
  try {
    const { getToken } = await auth();
    const token = await getToken();

    const res = await fetch(`${process.env.API_URL}/api/v1/transactions`, {
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
    return { success: false, message: "Error: Unable to get transaction" };
  }
};

export const getTransactionById = async (id: number): Promise<ApiResponse<number>> => {
  try {
    const { getToken } = await auth();
    const token = await getToken();

    const res = await fetch(`${process.env.API_URL}/api/v1/transactions/${id}`, {
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
    return { success: false, message: "Error: Unable to get transaction" };
  }
};



export const createTransaction = async (
  transactionData: TransactionRequestData
): Promise<ApiResponse<TransactionType>> => {
  try {
    const { getToken } = await auth();
    const token = await getToken();

    const res = await fetch(`${process.env.API_URL}/api/v1/transactions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transactionData),
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
    return { success: false, message: "Error: Unable to create transaction" };
  }
};

export const updateTransaction = async (
  id: number,
  transactionData: Partial<TransactionRequestData>
): Promise<ApiResponse<TransactionType>> => {
  try {
    const { getToken } = await auth();
    const token = await getToken();

    const res = await fetch(`${process.env.API_URL}/api/v1/transactions/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transactionData),
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
    return { success: false, message: "Error: Unable to update transaction" };
  }
};

export const deleteTransaction = async (id: number): Promise<ApiResponse<number>> => {
  try {
    const { getToken } = await auth();
    const token = await getToken();

    const res = await fetch(`${process.env.API_URL}/api/v1/transactions/${id}`, {
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
    return { success: false, message: "Error: Unable to delete transaction" };
  }
};


export const createPaymentAndUpdateInvoice = async (
  invoiceId: number,
  amount: number,
  issueDate: string,
  totalAmount: number,
  currentPaidAmount: number
): Promise<ApiResponse<TransactionType>> => {
  
  try {
    if (!amount || !issueDate) {
      throw new Error("Amount and issue date are required");
    }

    const parsedDate = new Date(issueDate as string)
      .toISOString()
      .split("T")[0];

    // Create transaction
    const res = await createTransaction({
      amount: Number(amount),
      issueDate: new Date(parsedDate).toISOString().split("T")[0],
      invoiceId,
    });
    
    if (!res.success) {
      throw new Error("Failed to create payment");
    }

    // Update invoice status based on payment amount
    if(res.success && res.data) {
      const newTotalPaid = currentPaidAmount + Number(amount);
      const newStatus = newTotalPaid >= totalAmount ? InvoiceStatus.PAID : InvoiceStatus.PARTIALLY_PAID;
      
      const data = {
        status: newStatus,
      };
      
      const updateRes = await updateInvoice(invoiceId, data);
      if(!updateRes.success) {
        console.error("Payment created but invoice status update failed");
      }
    }

    return res;
  } catch (error) {
    console.error("Error in createPaymentAndUpdateInvoice:", error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : "Failed to process payment" 
    };
  }
};