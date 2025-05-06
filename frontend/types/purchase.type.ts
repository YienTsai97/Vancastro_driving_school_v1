import { LicenseClass } from "./enums";
import { LessonTypeInterface } from "./lessonType.type";
import { PayerType } from "./payer.types";
import { UserType } from "./user.type";

export enum PurchaseStatus {
  PENDING = "PENDING",
  SENT = "SENT",
}

export type PurchaseType = {
  id: number;
  userId: number;
  licenseClass: LicenseClass;
  status: PurchaseStatus;
  createdAt: Date;
  updatedAt: Date;
  items: PurchaseItemType[];
  payerId: number;
  user: UserType;
  payer: PayerType;
};

export type PurchaseRequestData = {
  userId: number;
  licenseClass: LicenseClass;
  status: PurchaseStatus;
  purchaseItems: PurchaseItemRequestData[];
};

export type PurchaseItemType = {
  id: number;
  purchaseId: number;
  lessonTypeId: number;
  quantity: number;
  unitPrice: number;
  createdAt: Date;
  updatedAt: Date;
  lessonType: LessonTypeInterface;
};

export type PurchaseItemRequestData = {
  lessonTypeId: number;
  quantity: number;
  unitPrice: number;
};
