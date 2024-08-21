"use client";

import { Menu } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export default function Navbar() {
  const session = useSession();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <header className="fixed top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0 p-5 bg-emerald-300 ">
        <div className="flex flex-row w-full justify-between">
          <div className="flex items-center justify-center">
            <h1>GitSol</h1>
          </div>
          <div className=" flex flex-row justify-center items-center space-x-5">
            <Link href="/">Home</Link>
            <Link href="/docs">About</Link>
            <Link href="/bounties">Bounties</Link>
          </div>
          <div className="hidden sm:flex">
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
          <div className="sm:hidden flex items-center justify-center">
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48">
                <div className="flex flex-col space-y-2">
                  {session.data ? (
                    <>
                      <Link
                        href="/userwallet"
                        onClick={() => setIsPopoverOpen(false)}
                      >
                        <Button className="w-full">Wallet</Button>
                      </Link>
                      <Button
                        className="w-full"
                        onClick={() => {
                          signOut();
                          setIsPopoverOpen(false);
                        }}
                      >
                        Logout
                      </Button>
                    </>
                  ) : (
                    <Link
                      href="/signin"
                      onClick={() => setIsPopoverOpen(false)}
                    >
                      <Button className="w-full">Sign in</Button>
                    </Link>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </header>
  );
}
