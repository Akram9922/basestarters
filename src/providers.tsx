"use client"

import type { ReactNode } from "react"

export default function Providers({ children }: { children: ReactNode }) {
  const isV0Preview = typeof window !== "undefined" && window.location.hostname.includes("vusercontent.net")

  if (isV0Preview) {
    return <>{children}</>
  }

  const { OnchainKitProvider } = require("@coinbase/onchainkit")
  const { base } = require("@coinbase/onchainkit/constants")

  return (
    <OnchainKitProvider apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY} chain={base}>
      {children}
    </OnchainKitProvider>
  )
}
