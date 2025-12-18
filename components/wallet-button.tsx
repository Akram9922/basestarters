"use client"

import { useEffect, useState } from "react"

export function WalletButton() {
  const [isProduction, setIsProduction] = useState(false)
  const [ConnectButton, setConnectButton] = useState<any>(null)

  useEffect(() => {
    // Check if we're in production (not v0 preview)
    const hostname = window.location.hostname
    const isV0Preview = hostname.includes("vusercontent.net")

    if (!isV0Preview) {
      setIsProduction(true)
      // Dynamically import RainbowKit only in production
      import("@rainbow-me/rainbowkit").then((module) => {
        setConnectButton(() => module.ConnectButton)
      })
    }
  }, [])

  if (!isProduction || !ConnectButton) {
    return (
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        disabled
      >
        Connect Wallet (Deploy to Enable)
      </button>
    )
  }

  return <ConnectButton />
}
