"use client";

import { getAuthUri } from "@/utils/quickbooksApi";
import { AlertCircle, Link as LinkIcon, Plus, RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function InstructorFinanceHeader({ isQbConnected, tokenExpiresIn }: {
  isQbConnected: boolean,
  tokenExpiresIn: number | null,
  userId: number
}) {
  const [isConnecting, setIsConnecting] = useState(false);
  const router = useRouter();

  const handleConnectQuickBook = async () => {
    try {
      setIsConnecting(true);
      const url = await getAuthUri();
      window.open(url, "_blank");
    } catch (error) {
      console.error("Failed to connect to QuickBooks:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleRefreshConnection = async () => {
    try {
      setIsConnecting(true);
      const url = await getAuthUri();
      window.open(url, "_blank");
    } catch (error) {
      console.error("Failed to refresh QuickBooks connection:", error);
    }
    finally {
      setIsConnecting(false);
    }
  };

  const handleCreateInvoice = () => {
    router.push("/dashboard/finance/invoices/create");
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Finance Dashboard</h1>

        <div className="flex flex-row gap-3 mt-4 md:mt-0">
          {isQbConnected ? (
            <div className="flex flex-col">
              <button
                onClick={handleRefreshConnection}
                disabled={isConnecting}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm font-medium"
              >
                {isConnecting ? (
                  <>
                    <RefreshCcw className="w-4 h-4 animate-spin" />
                    Refreshing...
                  </>
                ) : (
                  <>
                    <LinkIcon className="w-4 h-4" />
                    QuickBooks Connected
                  </>
                )}
              </button>
              {tokenExpiresIn && (
                <span className="text-xs text-gray-500 mt-1 text-center">
                  Expires in {tokenExpiresIn} hours
                </span>
              )}
            </div>
          ) : (
            <button
              onClick={handleConnectQuickBook}
              disabled={isConnecting}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              {isConnecting ? (
                <>
                  <RefreshCcw className="w-4 h-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <LinkIcon className="w-4 h-4" />
                  Connect QuickBooks
                </>
              )}
            </button>
          )}

          <button
            onClick={handleCreateInvoice}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create Invoice
          </button>
        </div>
      </div>

      {!isQbConnected && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
          <div>
            <h3 className="font-medium text-yellow-800">QuickBooks Connection Required</h3>
            <p className="text-yellow-700 text-sm">
              Connect your account to QuickBooks to enable invoice synchronization and financial tracking.
            </p>
          </div>
        </div>
      )}
    </>
  );
}