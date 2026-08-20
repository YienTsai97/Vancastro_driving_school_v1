import InvoiceList from '@/components/user-dashboard/finance_invoice/invoice-list';
import { getRemainingAmount } from '@/utils/invoiceAmount';
import { getInvoicesByUserId } from '@/utils/invoiceFetch';
import { getPurchases } from '@/utils/purchaseFetch';
import { getUserByClerkId } from '@/utils/userFetch';
import { currentUser } from '@clerk/nextjs/server';
import { Clock, Package } from 'lucide-react';

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
  const [invoicesResponse, purchasesResponse] = await Promise.all([
    getInvoicesByUserId(user.id),
    getPurchases(),
  ]);

  const invoices = invoicesResponse?.data || [];
  const pendingPurchases = (purchasesResponse?.data || []).filter(
    (p) => p.userId === user.id && p.status === "PENDING"
  );

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

      {pendingPurchases.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-amber-600" />
            <h2 className="text-lg font-semibold text-amber-800">Pending Purchases</h2>
          </div>
          <p className="text-sm text-amber-700 mb-4">
            These purchases are awaiting invoice from your instructor.
          </p>
          <div className="space-y-3">
            {pendingPurchases.map((purchase) => (
              <div key={purchase.id} className="bg-white rounded-lg border border-amber-100 p-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-gray-500" />
                    <span className="font-medium text-gray-800">
                      {purchase.items.map((item) => (
                        <span key={item.id} className="block text-sm">
                          {item.lessonType.lessonName} × {item.quantity}
                        </span>
                      ))}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      ${purchase.items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0).toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(purchase.createdAt).toLocaleDateString("en-CA")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">Total Due</p>
            <p className="text-2xl font-bold">
              ${invoices.reduce((sum, invoice) => {
                return sum + getRemainingAmount(invoice.totalAmount, invoice.invoiceTransactions)
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