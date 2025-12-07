"use client"

import type { ReactNode } from "react"
import { OnchainKitProvider } from "@coinbase/onchainkit"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { base } from "viem/chains"
import { WagmiProvider, createConfig, http } from "wagmi"

const wagmiConfig = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
})

const queryClient = new QueryClient()

export default function Providers({ children }: { children: ReactNode }) {
  const isV0Preview = typeof window !== "undefined" && window.location.hostname.includes("vusercontent.net")

  if (isV0Preview) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md p-6 bg-white rounded-lg shadow-lg border border-gray-200">
          <h2 className="text-xl font-bold mb-2">Preview Environment</h2>
          <p className="text-gray-600 mb-4">
            OnchainKit wallet functionality cannot run in the v0 preview due to domain restrictions.
          </p>
          <p className="text-sm text-gray-500">
            Deploy to production at <strong>basestarters.vercel.app</strong> to enable full Smart Wallet features.
          </p>
        </div>
      </div>
    )
  }

  const apiKey = process.env["NEXT_PUBLIC_" + "ONCHAINKIT_API_KEY"]

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider apiKey={apiKey} chain={base}>
          {children}
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
