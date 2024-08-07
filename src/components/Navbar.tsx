"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

export default function Navbar() {
  const session = useSession();
  return (
    <header className="fixed top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0 p-5 bg-emerald-300 ">
        <div className="flex flex-row w-full justify-between">
          <div className="flex items-center justify-center">
            <h1>GitSol</h1>
          </div>
          <div className="flex flex-row justify-center items-center space-x-5">
            <Link href="/">Home</Link>
            <Link href="/">About</Link>
            <Link href="/">Bounties</Link>
          </div>
          <div className="">
            {session.data ? (
              <>
                <Link href="/userwallet" className="px-4">
                  <Button>Wallet</Button>
                </Link>
                <Button onClick={() => signOut()}>Logout</Button>
              </>
            ) : (
              <>
                <Link href="/signin">
                  <Button>Sign in</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
