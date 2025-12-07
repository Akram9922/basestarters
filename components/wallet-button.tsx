"use client"

import { Button } from "@/components/ui/button"

export function WalletButton() {
  const isV0Preview = typeof window !== "undefined" && window.location.hostname.includes("vusercontent.net")

  if (isV0Preview) {
    return (
      <Button variant="outline" disabled>
        Connect Wallet (Deploy to enable)
      </Button>
    )
  }

  const ConnectButton = require("@rainbow-me/rainbowkit").ConnectButton

  return <ConnectButton />
}
