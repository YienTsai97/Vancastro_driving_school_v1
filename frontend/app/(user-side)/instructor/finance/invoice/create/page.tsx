'use client';



// THIS IS THE PAGE TO CREATE AN INVOICE FROM SCRATCH


// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { createInvoice } from '@/utils/invoiceFetch'; 
// import { InvoiceRequestData } from '@/types/invoice.type';
// import { useUser } from '@clerk/nextjs';

export default function CreateInvoicePage() {
  // const router = useRouter();
  // const { user } = useUser();

  // const [lessonCount, setLessonCount] = useState(1);
  // const [status, setStatus] = useState<'UNPAID' | 'PAID'>('UNPAID');
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState('');

  // const handleSubmit = async () => {
  //   if (!user?.id) return;

  //   setIsLoading(true);
  //   setError('');

  //   const invoiceData: InvoiceRequestData = {
  //     userId: Number(user.id), 
  //     status,
  //     lessonCount,
  //   };

  //   const res = await createInvoice(invoiceData);
  //   setIsLoading(false);

  //   if (res.success) {
  //     router.push(`/instructor/invoices/${res.data.id}`);
  //   } else {
  //     setError(res.message || 'Failed to create invoice');
  //   }
  // };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-semibold mb-4">Create Invoice</h1>

      {/* {error && <p className="text-red-500">{error}</p>} */}

      {/* <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Lesson Count</label>
        <input
          type="number"
          min={1}
          value={lessonCount}
          onChange={(e) => setLessonCount(Number(e.target.value))}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as 'UNPAID' | 'PAID')}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="UNPAID">UNPAID</option>
          <option value="PAID">PAID</option>
        </select>
      </div>

      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isLoading ? 'Creating...' : 'Create Invoice'}
      </button> */}
    </div>
  );
}
