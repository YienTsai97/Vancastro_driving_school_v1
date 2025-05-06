import InvoiceList from '@/components/user-dashboard/finance_invoice/invoice-list';
import { getInvoicesByUserId } from '@/utils/invoiceFetch';
import { currentUser } from '@clerk/nextjs/server';
import { getUserByClerkId } from '@/utils/userFetch';

export default async function StudentInvoices() {
  const clerkUser = await currentUser();
  
  if (!clerkUser) {
    return (
      <div className="flex items-center justify-center h-64 w-full">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-32 bg-gray-200 rounded mb-4"></div>
          <div className="h-64 w-full max-w-2xl bg-gray-100 rounded"></div>
        </div>
      </div>
    );
  }
  
  const user = await getUserByClerkId(clerkUser.id);
  const invoicesResponse = await getInvoicesByUserId(user.id);
  
  const invoices = invoicesResponse?.data || [];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Invoices & Payments</h1>
            <p className="text-gray-500 mt-1">
              Manage your lesson invoices and payment history
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">Total Due</p>
            <p className="text-2xl font-bold">
              ${invoices.reduce((sum, invoice) => {
                const paidAmount = invoice.invoiceTransactions?.reduce(
                  (txSum, transaction) => txSum + transaction.amount, 0
                ) || 0;
                return sum + (invoice.totalAmount - paidAmount);
              }, 0).toFixed(2)}
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">Invoices</p>
            <p className="text-2xl font-bold">{invoices.length}</p>
          </div>
          
        </div>

        <InvoiceList 
          isStudent={true}
          invoices={invoices}
        />
      </div>
    </div>
  );
}