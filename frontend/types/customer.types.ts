export type QbCustomerType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
  };
};

export type QbCustomerRequestData = {
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
