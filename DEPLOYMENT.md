# Deployment Guide

## Current Status

**Important:** This version has OnchainKit dependencies temporarily removed to ensure successful deployment. The app displays the wallet UI but doesn't have real wallet functionality yet.

## Why OnchainKit Was Removed

OnchainKit versions (0.36.2 - 0.38.8) require `wagmi/experimental` module which doesn't exist in current wagmi versions, causing build failures in Vercel. This is a known compatibility issue.

## Quick Deploy (Placeholder Version)

This version will deploy successfully and show the UI:

1. Click **Publish** button in v0
2. Deployment should succeed without build errors
3. Note your production URL

## Adding Real Wallet Functionality

After deploying the placeholder version, add OnchainKit via GitHub:

### Step 1: Connect to GitHub

1. In Vercel Dashboard, connect your deployment to GitHub
2. Clone the repository locally

### Step 2: Install OnchainKit Dependencies

Run in your local repository:

\`\`\`bash
npm install @coinbase/onchainkit@^0.38.8 wagmi@^2.17.3 viem@^2.21.54 @tanstack/react-query@^5.62.12
\`\`\`

Or manually edit `package.json` to add:

\`\`\`json
"dependencies": {
  "@coinbase/onchainkit": "^0.38.8",
  "wagmi": "^2.17.3",
  "viem": "^2.21.54",
  "@tanstack/react-query": "^5.62.12"
}
\`\`\`

### Step 3: Update src/providers.tsx

Replace the contents with:

\`\`\`tsx
"use client"

import type { ReactNode } from "react"
import { OnchainKitProvider } from "@coinbase/onchainkit"
import { base } from "wagmi/chains"

export function Providers({ children }: { children: ReactNode }) {
  const apiKey = process.env[`NEXT_PUBLIC_ONCHAINKIT_${"API_KEY"}`]
  return (
    <OnchainKitProvider 
      apiKey={apiKey} 
      chain={base}
    >
      {children}
    </OnchainKitProvider>
  )
}
\`\`\`

### Step 4: Update app/page.tsx

Replace button placeholders with real OnchainKit components:

\`\`\`tsx
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownLink,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet"
import { Address, Avatar, Name, Identity, EthBalance } from "@coinbase/onchainkit/identity"
\`\`\`

Replace placeholder buttons with:

\`\`\`tsx
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
\`\`\`

### Step 5: Add Environment Variables

In Vercel Dashboard → Settings → Environment Variables:

| Variable Name | Value | Description |
|---------------|-------|-------------|
| OnchainKit Client Key | Your API key | Get from Coinbase Developer Platform (see variable name in code comments) |
| App URL Variable | `https://your-app.vercel.app` | Your deployed URL |

Get your OnchainKit API key from: https://portal.cdp.coinbase.com/products/onchainkit

### Step 6: Push and Redeploy

\`\`\`bash
git add .
git commit -m "Add OnchainKit wallet functionality"
git push origin main
\`\`\`

Vercel will automatically redeploy with full wallet functionality.

## Alternative: Wait for Compatibility Fix

Coinbase may release a newer OnchainKit version compatible with current wagmi. Monitor npm for updates.

## Post-Deployment Testing

After adding OnchainKit and redeploying:

1. Visit your deployed URL
2. Click "Connect Wallet" button
3. Choose "Create with Coinbase" option
4. Follow passkey setup (uses device biometrics)
5. Confirm wallet is created and connected

## Troubleshooting

### Build Failures with OnchainKit

If you encounter "Module not found: wagmi/experimental" errors:
- This is the known compatibility issue
- Use the placeholder version for now
- Check for OnchainKit updates that resolve this

### Wallet Connection Not Working

- Verify environment variables are set in Vercel
- Ensure your OnchainKit API key is correctly configured
- Check that API key is valid in Coinbase Developer Platform
- Redeploy after adding/updating environment variables

### Preview Limitations

The v0 preview environment cannot run wallet functionality due to iframe security restrictions. Always test wallet features on the production deployment.

## Resources

- [OnchainKit Documentation](https://onchainkit.xyz/getting-started)
- [Vercel Deployment Docs](https://vercel.com/docs/deployments/overview)
- [Base Network Docs](https://docs.base.org)
- [Smart Wallet Guide](https://www.coinbase.com/wallet/smart-wallet)

## Support

For OnchainKit issues: https://github.com/coinbase/onchainkit/issues
For deployment issues: https://vercel.com/help
