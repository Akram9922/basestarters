"use client"

import { useEffect, useState, type ReactNode } from "react"

export default function Providers({ children }: { children: ReactNode }) {
  const [isProduction, setIsProduction] = useState(false)
  const [WalletProviders, setWalletProviders] = useState<any>(null)

  useEffect(() => {
    const hostname = window.location.hostname
    const isV0Preview = hostname.includes("vusercontent.net")

    if (!isV0Preview) {
      setIsProduction(true)
      // Dynamically import wallet providers only in production
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
