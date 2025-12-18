"use client"

import type { ReactNode } from "react"
import { OnchainKitProvider } from "@coinbase/onchainkit"

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <OnchainKitProvider
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_ID}
      chain={{
        id: 8453,
        name: "Base",
        nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
        rpcUrls: { default: { http: ["https://mainnet.base.org"] } },
        blockExplorers: { default: { name: "BaseScan", url: "https://basescan.org" } },
      }}
    >
      {children}
    </OnchainKitProvider>
  )
}
