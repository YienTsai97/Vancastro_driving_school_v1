import { getPurchases } from "@/utils/purchaseFetch";
// import { getServices } from "@/utils/qb_fetcher";
import { getUserByClerkId } from "@/utils/userFetch";
import { currentUser} from "@clerk/nextjs/server"

import InstructorFinanceHeader from "@/components/user-dashboard/finance_invoice/instructor-finance-header";
import InvoiceList from '@/components/user-dashboard/finance_invoice/invoice-list';
import PurchaseRequestsList from "@/components/user-dashboard/finance_invoice/purchase-request-list";
import QuickBooksIntegration from "@/components/user-dashboard/finance_invoice/quickbooks-integration";
import { getInvoices } from '@/utils/invoiceFetch';

export default async function InstructorFinance() {
  const clerkUser = await currentUser();
  if (!clerkUser) {
    return <p>Loading...</p>;
  }
  const user = await getUserByClerkId(clerkUser.id);

  const invoices = await getInvoices()

  const qbTokenExpiresAt = user?.qbAccessTokenExpiresAt;

  const qbRefreshTokenExpiresAt = user?.qbRefreshTokenExpiresAt;

  // token expiration date
  const now = new Date();
  const tokenExpiryDate = qbTokenExpiresAt ? new Date(qbTokenExpiresAt) : null;
  const expiredAuthToken = tokenExpiryDate ? tokenExpiryDate < now : true;

  //Refresh token expiration date
  const reshTokenExpiryDate = qbRefreshTokenExpiresAt
    ? new Date(qbRefreshTokenExpiresAt)
    : null;
  const expired = reshTokenExpiryDate ? reshTokenExpiryDate < now : true;

  // Only consider connected if we have a token and it's not expired
  const isQbConnected = !expired && !expiredAuthToken;

  // Calculate time remaining until expiration if connected
  let tokenExpiresIn = null;
  if (isQbConnected && reshTokenExpiryDate) {
    tokenExpiresIn = Math.floor(
      (reshTokenExpiryDate.getTime() - now.getTime()) / (1000 * 60 * 60)
    ); // hours
  }

  const purchases = await getPurchases();
  const pendingPurchases =
    purchases.data?.filter((purchase) => purchase.status === "PENDING") || [];

  // fetch items
  // let fetchedServices = null;
  // if (isQbConnected) {
  //   fetchedServices = await getServices();
  // }

  // console.log("Fetched Services:", fetchedServices);

  return (
    <div className='w-full max-w-7xl mx-auto px-4 py-6'>
      <InstructorFinanceHeader
        isQbConnected={isQbConnected}
        tokenExpiresIn={tokenExpiresIn}
        userId={user.id}
      />

      {/* test */}
      {/* <div>
        {isQbConnected &&
          <Test
                data={fetchedServices}
                />
        }
      </div> */}

      <div className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden m-2'>
        <div className='p-6 border-b border-gray-200'>
          <h2 className='text-xl font-semibold text-gray-800'>
            Purchase requests
          </h2>
          <p className='text-gray-500 text-sm mt-1'>
            Create invoices for your students and manage your financial
            transactions
          </p>
        </div>

        <div className='p-0 md:p-4'>
          <PurchaseRequestsList
            userId={user.id}
            pendingPurchases={pendingPurchases}
          />
        </div>
      </div>

      <div className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden m-2'>
        <div className='p-6 border-b border-gray-200'>
          <h2 className='text-xl font-semibold text-gray-800'>Invoices</h2>
          <p className='text-gray-500 text-sm mt-1'>
            Manage your student invoices and financial transactions
          </p>
        </div>

        <div className='p-0 md:p-4'>
          <InvoiceList
            isStudent={false}
            invoices = {invoices.data || []}
          />
        </div>
      </div>

      <QuickBooksIntegration
        isQbConnected={isQbConnected}
        tokenExpiresAt={qbTokenExpiresAt}
        refreshTokenExpiresAt={qbRefreshTokenExpiresAt}
        userId={user.id}
      />
    </div>
  );
}
