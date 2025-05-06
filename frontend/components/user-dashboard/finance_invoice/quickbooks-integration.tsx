"use client"

import { getAuthUri } from "@/utils/quickbooksApi";
import { Link as LinkIcon, RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function QuickBooksIntegration({
  isQbConnected,
  tokenExpiresAt,
  refreshTokenExpiresAt,
  userId
}: {
  isQbConnected: boolean,
  tokenExpiresAt: string | null,
  refreshTokenExpiresAt: string | null,
  userId: number,
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
      // Call API endpoint to refresh the token
      const response = await fetch("/api/users/refresh-quickbooks-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        // Refresh the page to get updated token data
        router.refresh();
      } else {
        console.error("Failed to refresh QuickBooks token");
      }
    } catch (error) {
      console.error("Error refreshing QuickBooks token:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
      <h3 className="text-lg font-medium text-gray-800 mb-2">QuickBooks Integration</h3>
      <p className="text-gray-600 text-sm mb-4">
        Connect your account to QuickBooks to automatically sync your invoices and financial data.
        This allows for seamless accounting and tax preparation.
      </p>

      {!isQbConnected ? (
        <button
          onClick={handleConnectQuickBook}
          disabled={isConnecting}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-medium transition-colors"
        >
          {isConnecting ? (
            <>
              <RefreshCcw className="w-4 h-4 animate-spin" />
              Connecting to QuickBooks...
            </>
          ) : (
            <>
              <LinkIcon className="w-4 h-4" />
              Connect QuickBooks Account
            </>
          )}
        </button>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-800">QuickBooks Status</h4>
              <p className="text-green-600 text-sm flex items-center gap-1 mt-1">
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
                Connected
              </p>
            </div>
            <button
              onClick={handleRefreshConnection}
              disabled={isConnecting}
              className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              {isConnecting ? (
                <RefreshCcw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <RefreshCcw className="w-3.5 h-3.5" />
              )}
              Refresh token
            </button>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-500">Token expires:</span>
                <span className="block font-medium text-gray-800">
                  {tokenExpiresAt
                    ? new Date(tokenExpiresAt).toLocaleString()
                    : "N/A"}
                  <div className="text-[8px] text-gray-500">
                    MM/DD/YYYY
                  </div>
                </span>
              </div>
              <div>
                <span className="text-gray-500">Refresh token expires:</span>
                <span className="block font-medium text-gray-800">
                  {refreshTokenExpiresAt
                    ? new Date(refreshTokenExpiresAt).toLocaleString()
                    : "N/A"}
                  <div className="text-[8px] text-gray-500">
                    MM/DD/YYYY
                  </div>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}