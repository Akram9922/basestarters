# Base Wallet Onboarding App

A production-ready Next.js application with OnchainKit Smart Wallet integration for Base network.

## Features

- OnchainKit wallet provider with Smart Wallet support
- Passkey-based wallet creation (biometric authentication)
- Identity components (Avatar, Name, Address, Balance)
- Base network integration via Wagmi
- Modern UI with Tailwind CSS v4

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

**Note:** Wallet functionality requires environment variables. See Deployment section below.

## Environment Variables

Create a `.env.local` file (or add to Vercel):

```env
# OnchainKit API Key (get from Coinbase Developer Platform)
# Variable format: NEXT_PUBLIC_ + ONCHAINKIT_ + API_KEY
YOUR_ONCHAINKIT_KEY=your_api_key_here

NEXT_PUBLIC_APP_URL=https://your-app-url.vercel.app
```

Get your OnchainKit API key from: https://portal.cdp.coinbase.com/products/onchainkit

## Deployment

### Deploy to Vercel

1. Click **Publish** in v0 or push to GitHub and import to Vercel
2. Add environment variables in Vercel Dashboard (see DEPLOYMENT.md for details)
3. Deploy and test wallet connection

**Important:** The wallet functionality only works in production environments (not in v0 preview due to iframe restrictions).

## Project Structure

```
base-wallet-onboarding/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main page with wallet integration
│   └── globals.css         # Global styles
├── src/
│   └── providers.tsx       # OnchainKit provider setup
├── components/
│   └── ui/                 # Shadcn UI components
└── package.json
```

## Technologies

- Next.js 16 (App Router)
- React 19
- OnchainKit 1.1.2
- Wagmi 3.0.2
- Tailwind CSS v4
- TypeScript

## Resources

- [OnchainKit Documentation](https://onchainkit.xyz)
- [Base Documentation](https://docs.base.org)
- [Wagmi Documentation](https://wagmi.sh)

## License

MIT
