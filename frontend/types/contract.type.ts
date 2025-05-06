import { LicenseClass } from "./enums";

export enum ContractStatus {
  ONGOING = "ONGOING",
  DONE = "DONE",
}

export interface ContractType {
  id: number;
  userId: number;
  licenseClass: LicenseClass;
  status: ContractStatus;
  signature: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface ContractRequestData {
  userId: number;
  licenseClass: LicenseClass;
  signature: string;
}
