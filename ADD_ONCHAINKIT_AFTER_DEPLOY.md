# Add OnchainKit Wallet After Successful Deployment

This app is currently deployed WITHOUT OnchainKit to ensure a successful build. Follow these steps to add full wallet functionality:

## Step 1: Update package.json

Add OnchainKit to dependencies:

```json
"dependencies": {
  "@coinbase/onchainkit": "1.1.2",
  // ... keep existing dependencies
}
```

## Step 2: Update app/providers.tsx

```tsx
"use client"

import type { ReactNode } from "react"
import { OnchainKitProvider } from "@coinbase/onchainkit"
import { base } from "@coinbase/onchainkit/constants"

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <OnchainKitProvider
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_ID}
      chain={base}
      config={{
        appearance: {
          name: "Base Wallet",
          mode: "auto",
        },
      }}
    >
      {children}
    </OnchainKitProvider>
  )
}
```

## Step 3: Update app/page.tsx

Replace the placeholder buttons with OnchainKit wallet components:

```tsx
import { Wallet, ConnectWallet } from "@coinbase/onchainkit/wallet"
import { WalletDropdown, WalletDropdownLink, WalletDropdownDisconnect } from "@coinbase/onchainkit/wallet"
import { Address, Avatar, Name, Identity, EthBalance } from "@coinbase/onchainkit/identity"

// In your header:
<Wallet>
  <ConnectWallet>
    <Avatar className="h-6 w-6" />
    <Name />
  </ConnectWallet>
  <WalletDropdown>
    <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
      <Avatar />
      <Name />
      <Address />
      <EthBalance />
    </Identity>
    <WalletDropdownLink icon="wallet" href="https://keys.coinbase.com">
      Wallet
    </WalletDropdownLink>
    <WalletDropdownDisconnect />
  </WalletDropdown>
</Wallet>
```

## Step 4: Add Environment Variable

In Vercel dashboard:
- Go to Settings → Environment Variables
- Add: `NEXT_PUBLIC_ONCHAINKIT_PROJECT_ID`
- Value: Get from https://portal.cdp.coinbase.com/

## Step 5: Redeploy

Push to GitHub and Vercel will automatically redeploy with working wallet functionality.
