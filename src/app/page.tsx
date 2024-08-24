"use client";

import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <main className="flex-grow container mx-auto flex flex-col items-center justify-center">
        <h2 className="text-4xl font-bold mb-4 text-center md:text-left">Get Started with GitSol</h2>
        {!session ? (
          <>
            <p className="text-lg mb-8">
              Sign up using GitHub, generate a Solana wallet, and add funds to
              get started.
            </p>
            <Button onClick={() => signIn("github")} className="px-6 py-3">
              Sign In with GitHub
            </Button>
          </>
        ) : (
          <>

            <p className="text-lg mb-8 text-center md:text-left">
              As a maintainer, you can directly dispense Solana bounties by
              commenting <code>/bounty</code> under the PR.
            </p>

            <Button onClick={() => { router.push("/userwallet") }} className="px-6 py-3">
              Go to your wallet
            </Button>
          </>
        )}
      </main>
      <footer className="w-full py-4 bg-white shadow-md">
        <div className="container mx-auto text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} GitSol. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
