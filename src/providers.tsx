"use client"

import { OnchainKitProvider } from "@coinbase/onchainkit"
import { base } from "viem/chains"
import type { ReactNode } from "react"

export default function Providers({ children }: { children: ReactNode }) {
  return <OnchainKitProvider chain={base}>{children}</OnchainKitProvider>
}
