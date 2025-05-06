import { LessonType } from "./lesson.type";
import { PurchaseType } from "./purchase.type";
import { TransactionType } from "./transaction.type";
import { UserType } from "./user.type";

export enum InvoiceStatus {
  PAID = "PAID",
  PARTIALLY_PAID = "PARTIALLY_PAID",
  UNPAID = "UNPAID",
  CANCELLED = "CANCELLED",
  REFUNDED = "REFUNDED",
}

export type InvoiceType = {
  id: number;
  userId: number;
  user: UserType | undefined;
  purchaseId: number;
  purchase: PurchaseType | undefined;
  qbInvoiceId: string;
  status: InvoiceStatus;
  lessonCount: number;
  invoiceNumber: string;
  totalAmount: number;
  invoiceDate: Date;
  dueDate: string; // Format: YYYY-MM-DD
  discountPercent: number; // 0 if no discount
  createdAt: Date;
  updatedAt: Date;
  lessons: LessonType[];
  invoiceTransactions: TransactionType[];
};

export type QbInvoiceType = any;

export interface InvoiceResponseData {
  dbInvoice: InvoiceType;
  quickBooksInvoice: QbInvoiceType;
}

export interface InvoiceRequestData {
  userId: number;
  purchaseId: number;
  status: InvoiceStatus;
  lessonCount: number;
  invoiceNumber: string;
  totalAmount: number;
  dueDate: string; // Format: YYYY-MM-DD
  discountPercent?: number; // 0 if no discount
  lessonItems: {
    id: number;
    amount: number;
    quantity: number;
  }[];
}
