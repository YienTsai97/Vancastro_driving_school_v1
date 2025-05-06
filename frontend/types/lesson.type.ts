import { InvoiceType } from "./invoice.type";
import { LessonTypeInterface } from "./lessonType.type";
import { UserType } from "./user.type";

export enum LessonStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",
}

export type LessonType = {
  id: number;
  studentId: number;
  student: UserType | undefined;
  instructorId: number;
  instructor: UserType | undefined;
  lessonTypeId: number;
  lessonType: LessonTypeInterface | undefined;
  qbServiceId: string

  startTime: string;
  endTime: string;
  status: LessonStatus;
  location: string;
  invoiceId: number;
  invoice: InvoiceType | undefined;
  createdAt: Date;
  updatedAt: Date;
};

export type LessonRequestData = {
  studentId: number;
  instructorId: number;
  lessonTypeId: number;
  startTime: string;
  endTime: string;
  status: LessonStatus;
  location: string;
  invoiceId: number;
};

export type LessonEventType = {
  studentId: number;
  instructorId: number;
  startTime: string;
  endTime: string;
  status: LessonStatus;
  location: string;
  invoiceId: number;
  start: string;
  end: string;
  title: string;
};

export type DialogEventType = {
  instructorId?: number;
  invoiceId?: number;
  location?: string;
  status?: string;
  studentId?: string;
};

export type LessonBookingType = {
  studentId: number;
  instructorId: number;
  startTime: string;
  endTime: string;
  location: string;
};
