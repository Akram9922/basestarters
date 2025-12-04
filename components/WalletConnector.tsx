"use client";

import React, { useState } from "react";

export default function WalletConnector({ onAddress }: { onAddress: (addr: string | null) => void }) {
  const [addr, setAddr] = useState<string | null>(null);

  async function connect() {
    try {
      const anyWin: any = window;

      if (anyWin.ethereum) {
        const accounts: string[] = await anyWin.ethereum.request({
          method: "eth_requestAccounts",
        });

        const a = accounts?.[0] ?? null;
        setAddr(a);
        onAddress(a);

        if (a) localStorage.setItem("connectedAddress", a);
        return;
      }

      alert("No wallet found!");
    } catch (err) {
      console.error(err);
      onAddress(null);
    }
  }

  function disconnect() {
    setAddr(null);
    onAddress(null);
    localStorage.removeItem("connectedAddress");
  }

  return (
    <div>
      {addr ? (
        <div>
          <p>Connected: {addr}</p>
          <button onClick={disconnect}>Disconnect</button>
        </div>
      ) : (
        <button onClick={connect}>Connect Wallet</button>
      )}
    </div>
  );
}
