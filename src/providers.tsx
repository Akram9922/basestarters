"use client"

import type { ReactNode } from "react"

const isV0Preview = typeof window !== "undefined" && window.location.hostname.includes("vusercontent.net")

export default function Providers({ children }: { children: ReactNode }) {
  if (isV0Preview) {
    return <>{children}</>
  }

  const { getDefaultConfig, RainbowKitProvider } = require("@rainbow-me/rainbowkit")
  const { WagmiProvider } = require("wagmi")
  const { base, baseSepolia } = require("wagmi/chains")
  const { QueryClientProvider, QueryClient } = require("@tanstack/react-query")

  // Import styles only in production
  require("@rainbow-me/rainbowkit/styles.css")

  const config = getDefaultConfig({
    appName: "Base Wallet Onboarding",
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "YOUR_PROJECT_ID",
    chains: [base, baseSepolia],
    ssr: true,
  })

  const queryClient = new QueryClient()

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
