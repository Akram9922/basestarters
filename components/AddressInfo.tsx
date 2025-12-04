"use client";

import React, { useEffect, useState } from "react";

export default function AddressInfo({ address }: { address: string | null }) {
  const [info, setInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!address) {
      setInfo(null);
      return;
    }

    setLoading(true);

    fetch(/api/address/${address})
      .then((r) => r.json())
      .then((d) => setInfo(d))
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, [address]);

  if (!address) return <p>Wallet not connected</p>;
  if (loading) return <p>Loading wallet info…</p>;
  if (!info) return <p>No data found</p>;

  return (
    <div style={{ padding: 12, border: "1px solid #ddd", borderRadius: 8, marginTop: 20 }}>
      <h3>Wallet Info</h3>
      <p><b>Address:</b> {info.address}</p>
      <p><b>Balance:</b> {info.balance} ETH</p>
      <p><b>Tx Count:</b> {info.txCount}</p>
      <p><b>ENS:</b> {info.ens || "None"}</p>
      <p><b>Block:</b> {info.blockNumber}</p>
    </div>
  );
}
