
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { InvoiceType } from "@/types/invoice.type";
import { Label } from "@radix-ui/react-label";
import { Download, Calendar, DollarSign, UserCircle, CheckCircle, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
// import {createPaymentAndUpdateInvoice} from "@/utils/transactionFetch"
// import { Input } from '@/components/ui/input';
import TransactionForm from './transaction-form';
// import TransactionForm from './transaction-form';
// import { revalidatePath } from "next/cache";


export default function InvoiceListCard(
  { invoice, isStudent, index}: {
    invoice: InvoiceType;
    isStudent: boolean;
    index: number;
  },
) {

  let remainingAmount = invoice.totalAmount;

  if(invoice.invoiceTransactions?.length > 0) {
    const totalPaid = invoice.invoiceTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
    remainingAmount = invoice.totalAmount - totalPaid;
  }

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.currentTarget);
  //   await createPayment(
  //     invoice.id, 
  //     formData, 
  //     invoice.invoiceTransactions?.reduce((sum, transaction) => sum + transaction.amount, 0) || 0
  //   );
  // };

  // const createPayment = async(invoiceId: number, formData: FormData, totalPaid: number)=>{
  //   try{
  //       const amount = formData.get("amount");
  //     const issueDate = formData.get("issueDate");
  //     if (!amount || !issueDate) {
  //       throw new Error("Amount and issue date are required");
  //     }

  //     const parsedDate = new Date(issueDate as string)
  //       .toISOString()
  //       .split("T")[0];

  //     const res = await createTransaction({
  //       amount: Number(amount),
  //       issueDate: new Date(parsedDate).toISOString().split("T")[0],
  //       invoiceId,
  //     });
  //     if (!res.success) {
  //       throw new Error("Failed to create payment");
  //     }

  //     if(res.success && res.data) {
  //       const newTotalPaid = totalPaid + Number(amount);
  //       const newStatus = newTotalPaid >= invoice.totalAmount ? InvoiceStatus.PAID : InvoiceStatus.PARTIALLY_PAID;
  //       const data = {
  //         status: newStatus,
  //       };
  //       const res = await updateInvoice(invoiceId, data);
  //       if(res.success){
  //         console.log("done")
  //         // router.push("/instructor/finance");
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error creating payment:", error);
  //   }
  // };


  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Paid</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Pending</Badge>;
      case 'overdue':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Overdue</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">{status || 'Unknown'}</Badge>;
    }
  };
  return (
    <>
          <Accordion
              key={invoice.id || index}
              type="single"
              collapsible
              className="border rounded-lg shadow-sm overflow-hidden"
            >
              <AccordionItem value="item-1" className="border-none">
                <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 data-[state=open]:bg-gray-50">
                  <div className="flex justify-between items-center w-full">
                    <div className="flex flex-col gap-1 text-left">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-500">#{invoice.invoiceNumber || `INV0000${index + 1}`}</span>
                        {getStatusBadge(invoice.status)}
                      </div>
                      <h3 className="text-base font-medium">
                        {invoice.lessons[0]?.student?.firstName} {invoice.lessons[0]?.student?.lastName}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Payer: {invoice.purchase?.payer?.firstName} {invoice.purchase?.payer?.lastName}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold">${invoice.totalAmount || 0}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(invoice.createdAt || Date.now()).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="border-t px-6 py-4 bg-white">
                  <div className="flex flex-col gap-4">
                    {/* Download buttons */}
                    <div className="flex gap-3">
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Download className="size-4" />
                        Invoice PDF
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Download className="size-4" />
                        Contract
                      </Button>
                    </div> 

                    {/* Nested Accordion */}
                    <Accordion type="multiple" className="w-full">
                      {/* Lessons section */}
                        <AccordionItem value="lessons" className="border rounded-md overflow-hidden">
                        <div className="flex justify-between px-4 py-3 bg-gray-50">
                          <div className="flex items-center gap-2">
                          <Calendar className="size-4 text-gray-600" />
                          <h4 className="font-medium">Lessons</h4>
                          </div>
                          <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Switch id={`complete_cancelled_${index}`} />
                            <Label htmlFor={`complete_cancelled_${index}`} className="text-xs">
                            Show completed & cancelled
                            </Label>
                          </div>
                          <AccordionTrigger className="p-0 hover:no-underline" />
                          </div>
                        </div>
                        <AccordionContent className="px-4 py-3">
                          <div className="rounded-md border overflow-hidden">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-2 text-xs font-medium text-gray-500 text-left">Location/TimeSlot</th>
                              <th className="px-4 py-2 text-xs font-medium text-gray-500 text-left">Date</th>
                              <th className="px-4 py-2 text-xs font-medium text-gray-500 text-right">Status</th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {invoice.lessons?.map((lesson, lessonIndex) => (
                              <tr key={lessonIndex}>
                              <td className="px-4 py-2 text-sm">{lesson.location || '-'}</td>
                              <td className="px-4 py-2 text-sm">{new Date(lesson.startTime || Date.now()).toLocaleDateString()}</td>
                              <td className="px-4 py-2 text-sm text-right">
                                {lesson.status === 'COMPLETED' && <CheckCircle className="size-4 text-green-500 inline ml-1" />}
                                {lesson.status === 'CANCELLED' && <XCircle className="size-4 text-red-500 inline ml-1" />}
                                {lesson.status || 'Pending'}
                              </td>
                              </tr>
                            ))}
                            {(!invoice.lessons || invoice.lessons.length === 0) && (
                              <tr>
                              <td colSpan={3} className="px-4 py-3 text-sm text-center text-gray-500">No lessons found</td>
                              </tr>
                            )}
                            </tbody>
                          </table>
                          </div>

                          <div className="flex justify-between items-center mt-4 px-2">
                          <p className="font-medium text-sm">Remaining Lessons:</p>
                          <p className="text-sm font-semibold">{invoice.lessonCount || 0}</p>
                          </div>
                        </AccordionContent>
                        </AccordionItem>

                        {/* Payments section */}
                        <AccordionItem value="payments" className="border rounded-md overflow-hidden mt-3">
                        <div className="flex justify-between px-4 py-3 bg-gray-50">
                          <div className="flex items-center gap-2">
                          <DollarSign className="size-4 text-gray-600" />
                          <h4 className="font-medium">Payments</h4>
                          </div>
                          <AccordionTrigger className="p-0 hover:no-underline" />
                        </div>
                        <AccordionContent className="px-4 py-3">
                          <div className="rounded-md border overflow-hidden">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-2 text-xs font-medium text-gray-500 text-left">Amount</th>
                              <th className="px-4 py-2 text-xs font-medium text-gray-500 text-left">Date</th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {invoice.invoiceTransactions?.map((transaction, txIndex) => (
                              <tr key={txIndex}>
                              <td className="px-4 py-2 text-sm">${transaction.amount}</td>
                              <td className="px-4 py-2 text-sm">{new Date(transaction.issueDate || Date.now()).toLocaleDateString()}</td>
                              </tr>
                            ))}
                            {(!invoice.invoiceTransactions || invoice.invoiceTransactions.length === 0) && (
                              <tr>
                              <td colSpan={3} className="px-4 py-3 text-sm text-center text-gray-500">No payments found</td>
                              </tr>
                            )}
                            </tbody>
                          </table>
                          </div>

                          <div className="flex justify-between items-center mt-4 px-2 font-medium">
                          <p className="text-sm">Remaining Payment:</p>
                          <p
                            className={`text-sm ${
                            invoice.totalAmount - (invoice.invoiceTransactions?.reduce(
                              (sum, transaction) => sum + transaction.amount, 0
                            ) || 0) === 0
                              ? "text-green-600"
                              : "text-red-600"
                            }`}
                          >
                            ${invoice.totalAmount - (invoice.invoiceTransactions?.reduce(
                            (sum, transaction) => sum + transaction.amount, 0
                            ) || 0)}
                          </p>
                          </div>
                        </AccordionContent>
                        </AccordionItem>

                        {/* Create payment section - only for instructors */}
                        {!isStudent && (
                        <AccordionItem value="new-payment" className="border rounded-md overflow-hidden mt-3">
                          <div className="flex justify-between px-4 py-3 bg-gray-50">
                          <div className="flex items-center gap-2">
                            <UserCircle className="size-4 text-gray-600" />
                            <h4 className="font-medium">Create New Payment</h4>
                          </div>
                          <AccordionTrigger className="p-0 hover:no-underline" />
                          </div>

                          <AccordionContent className="px-4 py-3">
                            <TransactionForm
                              invoice={invoice}
                              remainingAmount={remainingAmount}
                            />
                          </AccordionContent>
                        </AccordionItem>
                        )}
                    </Accordion>
                  </div>

                  <div className="flex justify-between items-center mt-6 pt-4 border-t">
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-medium">Total:</span>
                      <span className="text-lg font-semibold">${invoice.totalAmount || 0}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Status:</span>
                      {getStatusBadge(invoice.status)}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
    </Accordion>
    </>

  )
}
