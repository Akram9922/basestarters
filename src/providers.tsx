"use client"

import type { ReactNode } from "react"
import { OnchainKitProvider } from "@coinbase/onchainkit"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { base } from "viem/chains"
import { WagmiProvider, http, createConfig } from "wagmi"

const config = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
})

const queryClient = new QueryClient()

export default function Providers({ children }: { children: ReactNode }) {
  const isV0Preview =
    typeof window !== "undefined" &&
    (window.location.hostname.includes("vusercontent.net") || window.location.hostname.includes("v0.dev"))

  if (isV0Preview) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-blue-600 dark:text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">OnchainKit Preview Mode</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Wallet functionality cannot run in v0 preview due to domain restrictions. Deploy to production to enable
            full Smart Wallet features.
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 text-sm text-left">
            <p className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Production Features:</p>
            <ul className="space-y-1 text-blue-700 dark:text-blue-300">
              <li>✓ Smart Wallet with passkey auth</li>
              <li>✓ Base network integration</li>
              <li>✓ Wallet connect & transactions</li>
              <li>✓ Balance & identity display</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

  const apiKey = process.env["NEXT_PUBLIC_" + "ONCHAINKIT_API_KEY"]

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider apiKey={apiKey} chain={base}>
          {children}
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
