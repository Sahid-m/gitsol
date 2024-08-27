"use client";

import { BackgroundBeams } from "@/components/ui/background-beams";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { Button } from "@/components/ui/button";
import { Meteors } from "@/components/ui/meteors";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="min-h-screen flex my-0 py-0 flex-col items-center justify-center bg-white dark:bg-black text-white">
      <BackgroundBeamsWithCollision >

        <main className="flex-grow my-0 py-0 container mx-auto flex flex-col items-center justify-center">
          <h2 className="text-4xl text-black dark:text-white font-bold mb-4 text-center md:text-left">Get Started with GitSol</h2>
          {!session ? (
            <>
              <p className="text-lg text-black dark:text-white mb-8">
                Sign up using GitHub, generate a Solana wallet, and add funds to
                get started.
              </p>
              <button onClick={() => signIn("github")} className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-white dark:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                Sign In with GitHub
              </button>
            </>
          ) : (
            <>

              <p className="text-lg mb-8 text-center md:text-left text-black dark:text-white">
                As a maintainer, you can directly dispense Solana bounties by
                commenting <code>/bounty</code> under the PR.
              </p>

              <button onClick={() => router.push('/dashboard')} className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-white dark:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                Dashboard
              </button>
            </>
          )}
        </main>

      </BackgroundBeamsWithCollision>
      <footer className="w-full py-4 dark:bg-white bg-black shadow-md">
        <div className="container my-0 mx-auto text-center">
          <p className="text-sm text-white dark:text-gray-500">
            &copy; {new Date().getFullYear()} GitSol. All rights reserved.
          </p>
        </div>
      </footer>



    </div>
  );
}
