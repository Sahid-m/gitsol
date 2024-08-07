"use client";

import { getSolBalanaceInUSD, addFunds } from "@/lib/solutils";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import * as web3 from "@solana/web3.js";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "./ui/toast";

export default function Card({
  name,
  img,
  primaryKey,
}: {
  name: string;
  img: string;
  primaryKey: string;
}) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [bal, setBal] = useState(0.0);
  const [amount, setAmount] = useState("");
  const [txSig, setTxSig] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

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

  const handleTransaction = async () => {
    if (!connection || !publicKey) {
      toast({
        title: "Error",
        description: "Please connect your wallet first!",
        variant: "destructive",
      });
      return;
    }

    setIsAdding(true);

    try {
      const signature = await addFunds(
        publicKey,
        new web3.PublicKey(primaryKey),
        parseFloat(amount),
        sendTransaction
      );
      setTxSig(signature);

      const newBalance = await getSolBalanaceInUSD(primaryKey);
      setBal(newBalance);

      toast({
        title: "Success",
        description: "Transaction completed successfully.",
        action: (
          <ToastAction
            altText="View Transaction"
            onClick={() =>
              window.open(
                `https://explorer.solana.com/tx/${signature}?cluster=devnet`,
                "_blank"
              )
            }
          >
            View Transaction
          </ToastAction>
        ),
      });

      // Close the popover after successful transaction
      setIsPopoverOpen(false);
    } catch (error) {
      console.error("Transaction Error:", error);
      if (error instanceof web3.SendTransactionError) {
        console.error("SendTransactionError:", (error as any).error);
        toast({
          title: "Error",
          description: (error as any).error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Transaction failed!",
          variant: "destructive",
        });
      }
    } finally {
      setAmount("");
      setIsAdding(false);
    }
  };

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
            <Button
              className="!text-sm"
              onClick={() => {
                navigator.clipboard.writeText(primaryKey);
                setCopied(true);
              }}
            >
              {copied ? "Copied!" : "Your Wallet Address"}
            </Button>
          </div>
          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
              <Button className="!text-sm">Add Funds</Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="p-4">
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount of SOL"
                  className="mb-4 p-2 border rounded"
                />
                <WalletMultiButton />
                <Button
                  className="!text-sm mt-2"
                  onClick={handleTransaction}
                  disabled={isAdding}
                >
                  {isAdding ? "Adding..." : "Add"}
                </Button>
              </div>
            </PopoverContent>
          </Popover>
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
