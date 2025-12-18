import type React from "react"
import type { Metadata } from "next"
import Providers from "@/src/providers"
import "./globals.css"

export const metadata: Metadata = {
  title: "Base Wallet Onboarding",
  description: "Seamless wallet onboarding with Smart Wallet and passkey support on Base",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
