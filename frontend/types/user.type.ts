
export enum Role {
  ADMIN,
  STUDENT,
  INSTRUCTOR
}

export enum LicenseClass {
  CLASS_4,
  CLASS_5,
  CLASS_7,
  NO_LICENSE
}


export type UserType = {
  id: number
  clerkId: string
  role: Role
  firstName: string
  lastName: string
  phone: string
  email: string
  language: string
  streetAddress: string
  unitNumber?: string
  city: string
  province: string
  postalCode: string
  country: string
  dateOfBirth: string
  licenseNumber: number
  licenseClass: string
  availability?: JSON
  emergencyContactNumber: string
  emergencyContactName: string
  contractId?: number;
  qb_token?: string;
  createdAt: Date;
  updatedAt: Date
}


// export type UserFormInitialType = {
//   id: number
//   clerkId: string
//   role: string
//   firstName: string
//   lastName: string
//   phone: string
//   email: string
//   language: string
//   streetAddress: string
//   unitNumber?: string
//   city: string
//   province: string
//   postalCode: string
//   country: string
//   dateOfBirth: string
//   licenseNumber: number | string
//   licenseClass: string
//   availability?: JSON
//   emergencyContactNumber: string
//   emergencyContactName: string
//   contractId?: number;
//   qb_token?: string;
//   createdAt: Date;
//   updatedAt: Date
// }


export type UserCreateType = {
  id: number
  clerkId: string
  role: string // except this others are same as userType
  firstName: string
  lastName: string
  phone: string
  email: string
  language: string
  streetAddress: string
  unitNumber?: string
  city: string
  province: string
  postalCode: string
  country: string
  dateOfBirth: string
  licenseNumber: number
  licenseClass: string
  availability?: JSON
  emergencyContactNumber: string
  emergencyContactName: string
  contractId?: number;
  qb_token?: string;
  createdAt: Date;
  updatedAt: Date
}