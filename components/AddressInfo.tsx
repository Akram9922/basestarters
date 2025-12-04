"use client"

import { Card } from "@/components/ui/card"
import { Wallet } from "lucide-react"

export default function AddressInfo() {
  return (
    <Card className="p-8 text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
        <Wallet className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold mb-2">Connect Your Wallet</h3>
      <p className="text-gray-600">Connect your wallet to view address analytics and transaction history</p>
    </Card>
  )
}
