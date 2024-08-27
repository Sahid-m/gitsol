"use client";
import {
  IconAward,
  IconBrandTabler,
  IconCoin,
  IconFileText,
  IconHome,
  IconLayoutDashboard,
  IconSettings,
  IconTrophy,
  IconUserBolt
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import ThemeToggle from "./theme-toggle";
import { Button } from "./ui/button";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";

interface LinkItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

export function SidebarFinal({ children }: { children: React.ReactNode }) {

  const session = useSession();

  const UnAuthenticatedLinks: LinkItem[] = [
    {
      label: "Home",
      href: "/",
      icon: <IconHome className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Docs",
      href: "/docs",
      icon: <IconFileText className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Bounties",
      href: "/bounties",
      icon: <IconTrophy className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
  ];
  const AuthenticatedLinks: LinkItem[] = [
    {
      label: "Home",
      href: "/",
      icon: <IconHome className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <IconLayoutDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "My Bounties",
      href: "/my-bounties",
      icon: <IconCoin className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Docs",
      href: "/docs",
      icon: <IconFileText className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Bounties",
      href: "/bounties",
      icon: <IconTrophy className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
  ];

  const [open, setOpen] = useState(false);

  return (
    <div className="h-screen w-screen flex flex-col md:flex-row overflow-hidden bg-neutral-200 dark:bg-neutral-900">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="h-full justify-between">
          <div className="flex flex-col flex-1 overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {session.status === 'authenticated' ? AuthenticatedLinks.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              )) :
                UnAuthenticatedLinks.map((link, idx) => (
                  <SidebarLink key={idx} link={link} />
                ))
              }

            </div>
          </div>
          {session.status === "authenticated" ? <>
            <div className="mt-4 flex items-center gap-2 px-4 py-2 border-t border-neutral-200 dark:border-neutral-700">
              <img
                //@ts-ignore
                src={session.data?.user?.image}
                className="h-8 w-8 rounded-full"
                width="32px"
                height="32px"
                alt="Avatar"
              />
              {open && (
                <div className="flex items-center justify-between w-full space-x-3">
                  <div className="text-sm text-neutral-700 dark:text-neutral-300">
                    {session.data?.user?.name}
                  </div>
                  <div className="justify-end items-end">
                    <Button className="text-sm px-3 py-2" variant={"destructive"} onClick={() => signOut()}>Logout</Button>
                  </div>
                </div>
              )}
            </div></> : <> {open && <Link href="/signin">
              <Button className="w-full" variant={"default"}>Sign in</Button>
            </Link>}</>}


          <ThemeToggle />
        </SidebarBody>
      </Sidebar>
      <main className="flex-1 w-full overflow-auto py-2 sm:py-4 md:py-8">
        <div className="w-full px-2 sm:px-4 md:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}

export const Logo = () => (
  <Link href="/" className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
    <img src="/favicon.png" width="25px" />
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="font-medium text-black dark:text-white whitespace-pre"
    >
      GitSol
    </motion.span>
  </Link>
);

export const LogoIcon = () => (
  <Link href="/" className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
    <img src="/favicon.png" width="25px" />
  </Link>
);