"use client"

import type { ReactNode } from "react"

export default function Providers({ children }: { children: ReactNode }) {
  const isV0Preview = typeof window !== "undefined" && window.location.hostname.includes("vusercontent.net")

  if (isV0Preview) {
    return <>{children}</>
  }

  const QueryClientProvider = require("@tanstack/react-query").QueryClientProvider
  const QueryClient = require("@tanstack/react-query").QueryClient
  const WagmiProvider = require("wagmi").WagmiProvider
  const RainbowKitProvider = require("@rainbow-me/rainbowkit").RainbowKitProvider
  const { getWagmiConfig } = require("./wagmi-config")

  const queryClient = new QueryClient()
  const config = getWagmiConfig()

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
