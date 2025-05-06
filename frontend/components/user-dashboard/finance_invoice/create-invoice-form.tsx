"use client";

import { InvoiceRequestData, InvoiceStatus } from "@/types/invoice.type";
import { PurchaseStatus, PurchaseType } from "@/types/purchase.type";
import { createInvoice } from "@/utils/invoiceFetch";
import { updatePurchase } from "@/utils/purchaseFetch";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  purchase: PurchaseType;
  payerName: string;
};

export default function CreateInvoiceForm({ purchase, payerName }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState<Partial<InvoiceRequestData>>({});

  useEffect(() => {
    setFormData({
      userId: purchase.userId,
      purchaseId: purchase.id,
      invoiceNumber: generateInvoiceNumber(),
      totalAmount: calculateTotalAmount(purchase),
      dueDate: getDefaultDueDate(),
      status: InvoiceStatus.UNPAID,
      lessonCount: 0,
      discountPercent: 0,
      lessonItems: prepareLessonItems(purchase),
    });
  }, [purchase]);

  const prepareLessonItems = (
    purchase: PurchaseType
  ): {
    id: number;
    amount: number;
    quantity: number;
  }[] => {
    return purchase.items.map((item) => ({
      id: item.lessonType.id,
      amount: item.unitPrice,
      quantity: item.quantity,
    }));
  };

  const calculateTotalAmount = (purchase: PurchaseType): number => {
    return purchase.items.reduce((total, item) => {
      return total + item.unitPrice;
    }, 0);
  };

  const generateInvoiceNumber = (): string => {
    return `INV-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  };

  const getDefaultDueDate = (): string => {
    const date = new Date();
    date.setDate(date.getDate() + 30);
    return date.toISOString().split("T")[0];
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === "number" ? parseFloat(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      if (
        !formData.userId ||
        !formData.invoiceNumber ||
        !formData.totalAmount ||
        !formData.dueDate
      ) {
        throw new Error("Please fill in all required fields");
      }

      const res = await createInvoice(formData as InvoiceRequestData);
      if (!res.success) {
        const errorMsg = await res.message;
        throw new Error(errorMsg || "Failed to create invoice");
      }

      const invoiceData = await res.data;
      if (!invoiceData) {
        throw new Error("Failed to create invoice");
      }

      // Update purchase status to "SENT"
      const purchaseRes = await updatePurchase(purchase.id, {
        status: PurchaseStatus.SENT,
      });
      if (!purchaseRes.success) {
        throw new Error("Failed to update purchase status");
      }
      if (!purchaseRes.data) {
        throw new Error("Failed to update purchase status");
      }

      router.push("/instructor/finance");
    } catch (error) {
      setErrorMessage((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='max-w-2xl mx-auto p-6 bg-white rounded shadow'>
      <h1 className='text-2xl font-bold mb-6'>Create Invoice</h1>

      {errorMessage && (
        <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
          {errorMessage}
        </div>
      )}

      <div>
        <label
          className='block text-gray-700 font-bold mb-2'
          htmlFor='Student Name'
        >
          Student Name
        </label>
        <p className='w-full px-3 py-2rounded'>
          {`${purchase.user.firstName}` + " " + `${purchase.user.lastName}` ||
            ""}
        </p>
      </div>
      <div>
        <label
          className='block text-gray-700 font-bold mb-2'
          htmlFor='Payer Name'
        >
          Payer Name
        </label>
        <p className='w-full px-3 py-2rounded'>{`${payerName}` || ""}</p>
      </div>
      <div>
        <label className='block text-gray-700 font-bold mb-2' htmlFor='dueDate'>
          Due Date
        </label>
        <input
          type='date'
          id='dueDate'
          name='dueDate'
          value={formData.dueDate || ""}
          onChange={handleChange}
          className='w-full px-3 py-2 border border-gray-300 rounded'
          required
        />
      </div>

      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <label
              className='block text-gray-700 font-bold mb-2'
              htmlFor='invoiceNumber'
            >
              Invoice Number
            </label>
            <input
              type='text'
              id='invoiceNumber'
              name='invoiceNumber'
              value={formData.invoiceNumber || ""}
              onChange={handleChange}
              className='w-full px-3 py-2 border border-gray-300 rounded'
              required
            />
          </div>

          {/* <div>
            <label
              className='block text-gray-700 font-bold mb-2'
              htmlFor='status'
            >
              Payer
            </label>
            <select
              id='payer'
              name='payer'
              onChange={handleChange}
              className='w-full px-3 py-2 border border-gray-300 rounded'
              required
            >
              <option value={InvoiceStatus.PAID}>Yamada Taro</option>
              <option value={InvoiceStatus.PARTIALLY_PAID}>Johne Smith</option>
            </select>
          </div> */}

          <div>
            <label
              className='block text-gray-700 font-bold mb-2'
              htmlFor='totalAmount'
            >
              Total Amount ($)
            </label>
            <input
              type='number'
              id='totalAmount'
              name='totalAmount'
              value={formData.totalAmount || ""}
              onChange={handleChange}
              min='0'
              step='0.01'
              className='w-full px-3 py-2 border border-gray-300 rounded'
              required
            />
          </div>

          <div>
            <label
              className='block text-gray-700 font-bold mb-2'
              htmlFor='dueDate'
            >
              Due Date
            </label>
            <input
              type='date'
              id='dueDate'
              name='dueDate'
              value={formData.dueDate || ""}
              onChange={handleChange}
              className='w-full px-3 py-2 border border-gray-300 rounded'
              required
            />
          </div>

          {/* <div>
            <label
              className='block text-gray-700 font-bold mb-2'
              htmlFor='status'
            >
              Status
            </label>
            <select
              id='status'
              name='status'
              value={formData.status || InvoiceStatus.UNPAID}
              onChange={handleChange}
              className='w-full px-3 py-2 border border-gray-300 rounded'
              required
            >
              <option value={InvoiceStatus.PAID}>Paid</option>
              <option value={InvoiceStatus.PARTIALLY_PAID}>
                Partially Paid
              </option>
              <option value={InvoiceStatus.UNPAID}>Unpaid</option>
              <option value={InvoiceStatus.CANCELLED}>Cancelled</option>
              <option value={InvoiceStatus.REFUNDED}>Refunded</option>
            </select>
          </div> */}

          <div>
            <label
              className='block text-gray-700 font-bold mb-2'
              htmlFor='discountPercent'
            >
              Discount (%)
            </label>
            <input
              type='number'
              id='discountPercent'
              name='discountPercent'
              value={formData.discountPercent || 0}
              onChange={handleChange}
              min='0'
              max='100'
              className='w-full px-3 py-2 border border-gray-300 rounded'
            />
          </div>
        </div>

        <div className='flex justify-end mt-6 space-x-4'>
          <button
            type='button'
            onClick={() => router.back()}
            className='px-4 py-2 bg-gray-300 text-gray-800 rounded'
          >
            Cancel
          </button>
          <button
            type='submit'
            disabled={loading}
            className='px-4 py-2 bg-green-400 rounded text-white font-bold disabled:bg-green-300'
          >
            {loading ? "Creating..." : "Create Invoice"}
          </button>
        </div>
      </form>
    </div>
  );
}

//   userId: number;
// payerId: number;
// qbServiceId: string;
// status: InvoiceStatus;
// lessonCount: number;
// invoiceNumber: string;
// totalAmount: number;
// dueDate: string; // Format: YYYY-MM-DD
// discountPercent?: number; // 0 if no discount
