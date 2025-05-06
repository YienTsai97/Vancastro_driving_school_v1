export type TransactionType = {
  id: number;
  invoiceId: number;
  amount: number;
  issueDate: string; // format: "YYYY-MM-DD"
  createdAt: Date;
  updatedAt: Date;
};

export type TransactionRequestData = {
  invoiceId: number;
  amount: number;
  issueDate: string; // format: "YYYY-MM-DD"
};
