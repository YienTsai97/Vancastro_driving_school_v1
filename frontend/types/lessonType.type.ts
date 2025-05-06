import { LicenseClass } from "./enums";

export type LessonTypeInterface = {
  id: number;
  qbServiceId?: string;
  lessonName: string;
  licenseClass: LicenseClass;
  lessonLength: number;
  count: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
};

export type LessonTypeRequestData = {
  lessonName: string;
  licenseClass: LicenseClass;
  lessonLength: number;
  price: number;
};
