# Wallet Setup Instructions

After successful deployment to production, follow these steps to add wallet functionality:

## Step 1: Add wallet dependencies to package.json

Add these to the "dependencies" section:

```json
"@rainbow-me/rainbowkit": "^2.2.10",
"@tanstack/react-query": "^5.62.16",
"viem": "^2.21.54",
"wagmi": "^2.19.5"
```

## Step 2: Create wallet provider components

**Create `components/wallet-providers.tsx`:**

```tsx
"use client"

import type { ReactNode } from "react"
import { WagmiProvider } from "wagmi"
import { base, baseSepolia } from "wagmi/chains"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit"

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || ""

const config = getDefaultConfig({
  appName: "Base Wallet App",
  projectId,
  chains: [base, baseSepolia],
  ssr: true,
})

const queryClient = new QueryClient()

export function WalletProviders({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
```

**Create `components/wallet-connect-button.tsx`:**

```tsx
"use client"

import { ConnectButton } from "@rainbow-me/rainbowkit"

export function WalletConnectButton() {
  return <ConnectButton />
}
```

## Step 3: Update wallet button

**Update `components/wallet-button.tsx`:**

```tsx
"use client"

import { WalletProviders } from "@/components/wallet-providers"
import { WalletConnectButton } from "@/components/wallet-connect-button"

export function WalletButton() {
  return (
    <WalletProviders>
      <WalletConnectButton />
    </WalletProviders>
  )
}
```

## Step 4: Add RainbowKit styles

Add this import at the top of `app/layout.tsx`:

```tsx
import "@rainbow-me/rainbowkit/styles.css"
```

## Step 5: Set environment variable

In Vercel Dashboard:
1. Go to Settings → Environment Variables
2. Add: `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`
3. Value: Get free Project ID from https://cloud.walletconnect.com/
4. Select all environments (Production, Preview, Development)
5. Save and redeploy

Your wallet will support Coinbase Wallet, MetaMask, and all WalletConnect-compatible wallets on Base network!
