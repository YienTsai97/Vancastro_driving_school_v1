export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
  needReAuth?: boolean; //true if the user needs to re-authenticate to QuickBooks
};
