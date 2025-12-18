"use client"

import type { ReactNode } from "react"
import { OnchainKitProvider } from "@coinbase/onchainkit"
import { base } from "viem/chains"

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <OnchainKitProvider
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_ID}
      chain={base}
      config={{
        appearance: {
          name: "Base Wallet",
          mode: "auto",
        },
      }}
    >
      {children}
    </OnchainKitProvider>
  )
}
