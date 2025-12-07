"use client"

import { WalletIcon, Shield, Zap, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

const isV0Preview = typeof window !== "undefined" && window.location.hostname.includes("vusercontent.net")

export default function Page() {
  if (isV0Preview) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <WalletIcon className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Base Wallet
              </span>
            </div>
            <Button variant="outline">Connect Wallet (Preview)</Button>
          </div>
        </header>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Welcome to Base
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Experience seamless onchain interactions with your wallet. Connect using Coinbase Wallet, MetaMask, or any
              WalletConnect-compatible wallet.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <p className="text-lg text-blue-900 mb-2 font-semibold">v0 Preview Environment</p>
              <p className="text-blue-700">
                RainbowKit wallet functionality requires production deployment. Deploy to{" "}
                <span className="font-mono">basestarters.vercel.app</span> to enable full wallet features.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Multi-Wallet Support</h3>
              <p className="text-gray-600">
                Connect with Coinbase Wallet, MetaMask, WalletConnect, and more. Your choice, your control.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Instant Connection</h3>
              <p className="text-gray-600">
                Get started in seconds with one-click wallet connection. Seamless integration with Base network.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Base Network</h3>
              <p className="text-gray-600">
                Built on Base, Coinbase's secure Layer 2 network. Fast transactions, low fees, endless possibilities.
              </p>
            </div>
          </div>
        </section>
      </main>
    )
  }

  return <ProductionPage />
}

function ProductionPage() {
  const { ConnectButton } = require("@rainbow-me/rainbowkit")
  const { useAccount } = require("wagmi")
  const { address, isConnected } = useAccount()

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <WalletIcon className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Base Wallet
            </span>
          </div>
          <ConnectButton />
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Welcome to Base
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Experience seamless onchain interactions with your wallet. Connect using Coinbase Wallet, MetaMask, or any
            WalletConnect-compatible wallet.
          </p>

          {isConnected && address && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
              <p className="text-lg text-green-900 mb-2 font-semibold">Wallet Connected!</p>
              <p className="text-green-700 font-mono text-sm break-all">{address}</p>
            </div>
          )}

          {!isConnected && (
            <div className="mb-8">
              <ConnectButton.Custom>
                {({ openConnectModal }) => (
                  <Button
                    size="lg"
                    onClick={openConnectModal}
                    className="px-8 py-6 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  >
                    Connect Your Wallet
                  </Button>
                )}
              </ConnectButton.Custom>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Multi-Wallet Support</h3>
            <p className="text-gray-600">
              Connect with Coinbase Wallet, MetaMask, WalletConnect, and more. Your choice, your control.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Instant Connection</h3>
            <p className="text-gray-600">
              Get started in seconds with one-click wallet connection. Seamless integration with Base network.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Globe className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Base Network</h3>
            <p className="text-gray-600">
              Built on Base, Coinbase's secure Layer 2 network. Fast transactions, low fees, endless possibilities.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
