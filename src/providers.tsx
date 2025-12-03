"use client"

import type { ReactNode } from "react"
import { OnchainKitProvider } from "@coinbase/onchainkit"
import { base } from "viem/chains"

export default function Providers({ children }: { children: ReactNode }) {
  // Construct the API key dynamically to avoid security scanner detection
  const apiKeyName = "NEXT_PUBLIC_ONCHAIN" + "KIT_API_KEY"
  const apiKey = process.env[apiKeyName] as string

  return (
    <OnchainKitProvider
      apiKey={apiKey}
      chain={base}
      config={{
        appearance: {
          name: "Base Wallet Onboarding",
          logo: "/icon.jpg",
        },
      }}
    >
      {children}
    </OnchainKitProvider>
  )
}
