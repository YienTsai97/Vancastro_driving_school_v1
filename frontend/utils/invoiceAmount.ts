export const getTotalPaid = (
  transactions?: { amount: number | string }[]
) => (transactions ?? []).reduce((sum, tx) => sum + Number(tx.amount), 0);

export const getRemainingAmount = (
  totalAmount: number | string,
  transactions?: { amount: number | string }[]
) => Number(totalAmount) - getTotalPaid(transactions);