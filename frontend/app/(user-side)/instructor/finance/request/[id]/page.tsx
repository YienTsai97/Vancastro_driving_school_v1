import CreateInvoiceForm from "@/components/user-dashboard/finance_invoice/create-invoice-form";
import { PurchaseType } from "@/types/purchase.type";
import { getDbPayerById } from "@/utils/payerFetch";
import { getPurchaseById } from "@/utils/purchaseFetch";

type Props = {
  params: {
    id: string;
  };
};

export default async function page({ params }: Props) {
  const { id } = await params;
  const purchaseId = Number(id);
  if (!purchaseId) {
    return <div>Purchase ID invalid</div>;
  }

  const res = await getPurchaseById(purchaseId);
  if (!res.success) {
    return <div>Purchase not found</div>;
  }
  const purchase = res.data as PurchaseType;

  console.log("Purchase:", purchase);
  const payer = await getDbPayerById(purchase.payerId);
  const payerName = `${payer.data?.firstName} ${payer.data?.lastName}`;
  return (
    <div>
      <CreateInvoiceForm purchase={purchase} payerName={payerName} />
    </div>
  );
}
