"use client"
import { Input } from "@/components/ui/input";
import { Calendar, DollarSign} from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { InvoiceType } from '@/types/invoice.type';
import { Button } from '@/components/ui/button';
import {createPaymentAndUpdateInvoice} from "@/utils/transactionFetch"

export default function TransactionForm({invoice, remainingAmount}: {
  invoice: InvoiceType,
  remainingAmount: number,
}) {
  const handleSubmit = async (invoice:InvoiceType ,amount: number, issueDate: string) => {
    const totalPaid = invoice.invoiceTransactions?.reduce((sum, transaction) => sum + transaction.amount, 0) || 0;
    try {
      const res = await createPaymentAndUpdateInvoice(
        invoice.id,
        amount,
        issueDate,
        invoice.totalAmount,
        totalPaid
      );
      
      if (res.success) {
        console.log("Payment and invoice update completed");
        // Optionally refresh the page or update UI
        window.location.reload();
      } else {
        alert(res.message || "Failed to create payment. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting payment:", error);
      alert("Failed to create payment. Please try again.");
    }
  };
  return (
    <>
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              const form = e.currentTarget;
                              const amount = parseFloat((form.elements.namedItem("amount") as HTMLInputElement).value);
                              const issueDate = (form.elements.namedItem("issueDate") as HTMLInputElement).value;
                              handleSubmit(invoice, amount, issueDate);
                            }}
                            className="space-y-4"
                          >
                            <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <Label htmlFor="student-name" className="text-xs font-medium text-gray-500">Student</Label>
                              <div className="px-3 py-2 border rounded-md bg-gray-50 text-sm">
                              {invoice.user?.firstName} {invoice.user?.lastName}
                              </div>
                            </div>
                            <div className="space-y-1">
                              <Label htmlFor="payer-name" className="text-xs font-medium text-gray-500">Payer</Label>
                              <div className="px-3 py-2 border rounded-md bg-gray-50 text-sm">
                              {invoice.purchase?.payer?.firstName} {invoice.purchase?.payer?.lastName}
                              </div>
                            </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <Label htmlFor="amount" className="text-xs font-medium text-gray-500">Amount ($)</Label>
                              <div className="relative">
                              <DollarSign className="absolute left-3 top-2.5 size-4 text-gray-400" />
                              <Input
                                type="number"
                                name="amount"
                                id="amount"
                                placeholder="0.00"
                                step="0.01"
                                min="1"
                                max={remainingAmount}
                                className="pl-10"
                                required
                              />
                              </div>
                            </div>
                            <div className="space-y-1">
                              <Label htmlFor="issue-date" className="text-xs font-medium text-gray-500">Payment Date</Label>
                              <div className="relative">
                              <Calendar className="absolute left-3 top-2.5 size-4 text-gray-400" />
                              <Input
                                type="date"
                                name="issueDate"
                                id="issue-date"
                                defaultValue={new Date().toISOString().split("T")[0]}
                                className="pl-10"
                                required
                              />
                              </div>
                            </div>
                            </div>

                            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                            Record Payment
                            </Button>
                          </form>
    </>
  )
}
