'use client';

import AppWalletProvider from "@/components/AppWalletProvider";
import { SessionProvider } from "next-auth/react";


export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <AppWalletProvider>

                {children}
            </AppWalletProvider>
        </SessionProvider>
    )
}
