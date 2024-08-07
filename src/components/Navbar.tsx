"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import PrimaryButton from "./Button";

export default function Navbar() {
  const session = useSession();
  return (
    <div className="flex fixed justify-center w-screen p-5 bg-emerald-300 ">
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
                <PrimaryButton>Wallet</PrimaryButton>
              </Link>
              <PrimaryButton onClick={() => signOut()}>Logout</PrimaryButton>
            </>
          ) : (
            <>
              <Link href="/signin">
                <PrimaryButton>Sign in</PrimaryButton>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
