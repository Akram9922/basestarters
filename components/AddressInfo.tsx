"use client"

import { useAccount } from "wagmi"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useEffect, useState } from "react"
import { Activity, Clock, FileCode, Wallet } from "lucide-react"

interface AddressAnalytics {
  balance: string
  transactionCount: number
  contractInteractions: number
  firstTransaction: string | null
  lastActivity: string | null
}

export default function AddressInfo() {
  const { address, isConnected } = useAccount()
  const [analytics, setAnalytics] = useState<AddressAnalytics | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!address || !isConnected) {
      setAnalytics(null)
      return
    }

    const fetchAnalytics = async () => {
      setLoading(true)
      setError(null)

      try {
        const apiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
        if (!apiKey) {
          throw new Error("Alchemy API key not configured")
        }

        const alchemyUrl = `https://base-mainnet.g.alchemy.com/v2/${apiKey}`

        // Fetch balance
        const balanceResponse = await fetch(alchemyUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: 1,
            method: "eth_getBalance",
            params: [address, "latest"],
          }),
        })
        const balanceData = await balanceResponse.json()
        const balanceWei = BigInt(balanceData.result)
        const balanceEth = (Number(balanceWei) / 1e18).toFixed(6)

        // Fetch transaction count
        const txCountResponse = await fetch(alchemyUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: 2,
            method: "eth_getTransactionCount",
            params: [address, "latest"],
          }),
        })
        const txCountData = await txCountResponse.json()
        const transactionCount = Number.parseInt(txCountData.result, 16)

        // Fetch asset transfers for first and last activity
        const transfersResponse = await fetch(alchemyUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: 3,
            method: "alchemy_getAssetTransfers",
            params: [
              {
                fromBlock: "0x0",
                toBlock: "latest",
                fromAddress: address,
                category: ["external", "internal", "erc20", "erc721", "erc1155"],
                maxCount: "0x3e8",
              },
            ],
          }),
        })
        const transfersData = await transfersResponse.json()
        const transfers = transfersData.result?.transfers || []

        // Count contract interactions (internal, erc20, erc721, erc1155)
        const contractInteractions = transfers.filter((tx: any) => tx.category !== "external").length

        // Get first and last transaction timestamps
        let firstTransaction = null
        let lastActivity = null

        if (transfers.length > 0) {
          const timestamps = transfers
            .map((tx: any) => tx.metadata?.blockTimestamp)
            .filter(Boolean)
            .sort()

          if (timestamps.length > 0) {
            firstTransaction = new Date(timestamps[0]).toLocaleString()
            lastActivity = new Date(timestamps[timestamps.length - 1]).toLocaleString()
          }
        }

        setAnalytics({
          balance: balanceEth,
          transactionCount,
          contractInteractions,
          firstTransaction,
          lastActivity,
        })
      } catch (err) {
        console.error("Error fetching analytics:", err)
        setError(err instanceof Error ? err.message : "Failed to fetch analytics")
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [address, isConnected])

  if (!isConnected) {
    return (
      <Card className="p-8 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
          <Wallet className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Connect Your Wallet</h3>
        <p className="text-gray-600">Connect your wallet to view address analytics</p>
      </Card>
    )
  }

  if (loading) {
    return (
      <Card className="p-6">
        <div className="space-y-4">
          <Skeleton className="h-8 w-48" />
          <div className="grid md:grid-cols-2 gap-4">
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
          </div>
        </div>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="p-8 text-center border-red-200 bg-red-50">
        <p className="text-red-600 font-medium">{error}</p>
        <p className="text-sm text-red-500 mt-2">Please check your Alchemy API key configuration</p>
      </Card>
    )
  }

  if (!analytics) {
    return null
  }

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Activity className="w-6 h-6 text-blue-600" />
        Address Analytics
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Wallet className="w-5 h-5 text-blue-600" />
            <p className="text-sm font-medium text-gray-600">Native Balance</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">{analytics.balance} ETH</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-5 h-5 text-purple-600" />
            <p className="text-sm font-medium text-gray-600">Total Transactions</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">{analytics.transactionCount}</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <FileCode className="w-5 h-5 text-green-600" />
            <p className="text-sm font-medium text-gray-600">Contract Interactions</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">{analytics.contractInteractions}</p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-orange-600" />
            <p className="text-sm font-medium text-gray-600">Last Activity</p>
          </div>
          <p className="text-sm font-semibold text-gray-900">{analytics.lastActivity || "No activity"}</p>
        </div>
      </div>

      {analytics.firstTransaction && (
        <div className="mt-4 pt-4 border-t">
          <p className="text-sm text-gray-600">
            <span className="font-medium">First Transaction:</span> {analytics.firstTransaction}
          </p>
        </div>
      )}
    </Card>
  )
}
