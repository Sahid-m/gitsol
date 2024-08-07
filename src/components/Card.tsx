"use client";

import { getSolBalanaceInUSD } from "@/lib/solutils";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import React, { useEffect, useState } from "react";
import PrimaryButton from "./Button";
import Image from "next/image";

export default function Card({
  name,
  img,
  primaryKey,
}: {
  name: string;
  img: string;
  primaryKey: string;
}) {
  const [copied, setCopied] = useState(false);
  const [bal, setBal] = useState(0.0);

  useEffect(() => {
    const copied = setTimeout(() => {
      setCopied(false);
    }, 2000);

    return () => {
      clearTimeout(copied);
    };
  }, [copied]);

  useEffect(() => {
    async function fetchBal() {
      const bal = await getSolBalanaceInUSD(primaryKey);
      // You can set the balance to a state or perform other actions with it here
      setBal(bal);
    }

    fetchBal();
  }, [primaryKey]);

  return (
    <>
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-4">
          {AccountInfo()}
          <div className="mt-6 flex justify-between items-center">
            <div className="text-3xl font-bold text-gray-900">
              ${bal.toFixed(2)}{" "}
              <span className="text-lg font-medium text-gray-500">USD</span>
            </div>
            <PrimaryButton
              className="!text-sm"
              onClick={() => {
                navigator.clipboard.writeText(primaryKey);
                setCopied(true);
              }}
            >
              {copied ? "Copied!" : "Your Wallet Address"}
            </PrimaryButton>
          </div>
        </div>
      </div>
      <div className="max-w-lg bg-slate-50 mx-auto shadow-lg">
        <div className="flex justify-center  items-center">
          {/* <PrimaryButton className='!text-sm !w-1/3'>
    
                    </PrimaryButton> */}
        </div>
      </div>
    </>
  );

  function AccountInfo() {
    return (
      <div className="flex items-center">
        <Image
          alt="Profile"
          className=" rounded-full flex items-center justify-center text-xl font-semibold"
          src={img}
          width={50}
          height={50}
        />
        <div className="ml-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Welcome back, {name}!
          </h2>
          <p className="text-gray-500">Gitsol Account Assets</p>
        </div>
      </div>
    );
  }
}
