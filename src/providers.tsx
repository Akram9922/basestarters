"use client"

import type { ReactNode } from "react"
import { useEffect, useState } from "react"

export default function Providers({ children }: { children: ReactNode }) {
  const [isProduction, setIsProduction] = useState(false)
  const [WalletProviders, setWalletProviders] = useState<any>(null)

  useEffect(() => {
    const hostname = window.location.hostname
    const isV0Preview = hostname.includes("vusercontent.net")

    if (!isV0Preview) {
      setIsProduction(true)
      import("./wallet-providers").then((module) => {
        setWalletProviders(() => module.WalletProviders)
      })
    }
  }, [])

  if (!isProduction || !WalletProviders) {
    return <>{children}</>
  }

  return <WalletProviders>{children}</WalletProviders>
}
