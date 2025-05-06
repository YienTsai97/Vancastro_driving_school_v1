export type PayerType = {
  id: number;
  userId: number;
  qbCustomerId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  streetAddress: string;
  unitNumber?: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;

  createdAt: Date;
  updatedAt: Date;
};

export type QbCustomerType = any;

export type PayerRequestData = {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  streetAddress: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
};

export type PayerResponseData = {
  dbPayer: PayerType;
  quickBooksCustomer: QbCustomerType;
};
