"use client";

// import { useState } from "react";
import { 
  ArrowRight,
  FileText, 
  // Loader2, 
  // PlusCircle 
} from "lucide-react";
import { PurchaseType } from '@/types/purchase.type';
import { useRouter } from "next/navigation";


export default function PurchaseRequestsList({ userId, pendingPurchases }: { userId: number, pendingPurchases: PurchaseType[] }) {
  // const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const purchaseRequests = pendingPurchases

console.log(userId)


  const handleCreateInvoiceFromPurchase = (purchaseId:number) => {
    router.push(`/instructor/finance/request/${purchaseId}`);
  };

  // if (isLoading) {
  //   return (
  //     <div className="flex justify-center items-center p-8">
  //       <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
  //     </div>
  //   );
  // }

  if (purchaseRequests.length === 0) {
    return (
      <div className="text-center py-8">
        <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <h3 className="text-lg font-medium text-gray-700">No purchase requests</h3>
        <p className="text-gray-500 mt-1">Purchase requests from students will appear here</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto h-[400px]">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Student
            </th>
            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Package
            </th>
            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Requested Date
            </th>
            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            </th>
          </tr>
          </thead>
        
        <tbody className="bg-white divide-y divide-gray-200">
          {purchaseRequests.map((data) => (
            <tr key={data.id} className="hover:bg-gray-50">
              <td className="px-3 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {data.user.firstName} {data.user.lastName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {data.user.email}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-3 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {data.items.map((item) => (
                    <div key={item.id} className="text-[8px] text-gray-500 font-bold">
                      {item.lessonType.lessonName} x {item.quantity}
                    </div>
                  ))}
                </div>
              </td>
              <td className="px-3 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {new Date(data.createdAt).toLocaleDateString()} 
                  <div className="text-[8px] text-gray-500">
                    MM/DD/YYYY
                  </div>
                </div>
              </td>
              <td className="px-3 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleCreateInvoiceFromPurchase(data.id)}
                    className="text-indigo-600 hover:text-indigo-900 inline-flex items-center"
                  >
                    Create Invoice
                    <ArrowRight className="ml-1 w-4 h-4" />
                  </button>
              </td>
            </tr>
          ))}
        </tbody> 
      </table>
    </div>
  );
}