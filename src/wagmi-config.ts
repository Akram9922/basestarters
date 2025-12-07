import { getDefaultConfig } from "@rainbow-me/rainbowkit"
import { base, baseSepolia } from "wagmi/chains"

export function getWagmiConfig() {
  return getDefaultConfig({
    appName: "Base Wallet Onboarding",
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "YOUR_PROJECT_ID",
    chains: [base, baseSepolia],
    ssr: true,
  })
}
