"use client";

import { ReactNode } from "react";
import { OnchainKitProvider } from "@coinbase/onchainkit";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <OnchainKitProvider
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY!}
      appUrl={process.env.NEXT_PUBLIC_APP_URL!}
    >
      {children}
    </OnchainKitProvider>
  );
}
