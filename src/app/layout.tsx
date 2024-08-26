
import { SidebarFinal } from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GitSol",
  description: "A Github Bounty bot for giving out bounty in solana",
  icons: '/favicon.png'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <ThemeProvider attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange>
            <SidebarFinal>{children}</SidebarFinal>
          </ThemeProvider>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
