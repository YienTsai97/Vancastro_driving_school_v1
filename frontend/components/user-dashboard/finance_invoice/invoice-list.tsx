import { InvoiceType } from "@/types/invoice.type";
import {FileText} from "lucide-react";
import InvoiceListCard from './invoice-list-card';

export default async function InvoiceList({
  isStudent,
  invoices,
}: {
  isStudent: boolean;
  invoices: InvoiceType[];
}) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      {invoices.length === 0 ? (
        <div className="w-full flex flex-col gap-4 justify-center items-center h-64 border rounded-lg bg-gray-50 p-8">
          <FileText className="size-12 text-gray-400" />
          <h3 className="text-lg font-medium text-gray-500">No invoices available</h3>
          <p className="text-sm text-gray-400">When invoices are created, they will appear here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {invoices.map((invoice, index) => (
            <InvoiceListCard
              key={index}
              invoice={invoice}
              isStudent={isStudent}
              index={index}
              />
          ))}
        </div>
      )}
    </div>
  );
}