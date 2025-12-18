# Deploy First, Then Add Wallet

This guide shows you how to add wallet functionality AFTER successful deployment.

## Step 1: Deploy Current Code

1. Push this code to GitHub - it will deploy successfully
2. Verify deployment at https://basestarters.vercel.app
3. Only proceed once deployment succeeds

## Step 2: Add WalletConnect Project ID

1. Go to https://cloud.walletconnect.com/
2. Sign up/login (free)
3. Create new project
4. Copy the Project ID
5. In Vercel dashboard → Your Project → Settings → Environment Variables
6. Add: `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` = your project ID
7. Save and redeploy

## Step 3: Update Files

Add this to `src/wallet-config.tsx`:

```tsx
"use client"

import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { WagmiProvider } from "wagmi"
import { base } from "wagmi/chains"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import type { ReactNode } from "react"

const config = getDefaultConfig({
  appName: "Base Trivia App",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "",
  chains: [base],
  ssr: true,
})

const queryClient = new QueryClient()

export function WalletProviders({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
```

Update `src/providers.tsx`:

```tsx
"use client"

import type { ReactNode } from "react"
import { WalletProviders } from "./wallet-config"

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <WalletProviders>
      {children}
    </WalletProviders>
  )
}
```

Update `components/wallet-button.tsx`:

```tsx
"use client"

import { ConnectButton } from "@rainbow-me/rainbowkit"

export function WalletButton() {
  return <ConnectButton />
}
```

Add to `app/layout.tsx` in the `<head>`:

```tsx
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@rainbow-me/rainbowkit@2/dist/index.css"
/>
```

## Step 4: Push and Deploy

Push these changes to GitHub. Wallet will now work in production!
