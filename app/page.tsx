"use client"

import { WalletIcon, Shield, Zap, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Page() {
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
          <Button disabled className="bg-gray-200 text-gray-500">
            Connect Wallet (Add OnchainKit)
          </Button>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent text-balance">
            Welcome to Base
          </h1>
          <p className="text-xl text-gray-600 mb-8 text-pretty">
            Experience seamless onchain interactions with your wallet. Connect using Coinbase Smart Wallet with passkey
            support.
          </p>

          <div className="flex justify-center">
            <Button disabled className="bg-gray-200 text-gray-500">
              Connect Wallet (Add OnchainKit)
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Smart Wallet</h3>
            <p className="text-gray-600">
              Coinbase Smart Wallet with passkey support. Secure, fast, and seamless authentication.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Instant Connection</h3>
            <p className="text-gray-600">
              Get started in seconds with one-click wallet connection. No browser extension required.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Globe className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Base Network</h3>
            <p className="text-gray-600">
              Built on Base, Coinbase's secure Layer 2 network. Fast transactions, low fees.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
