"use client";

import { useToast } from "@/components/ui/use-toast";
import { addFunds, getSolBalanaceInUSD, withdrawFunds } from "@/lib/solutils";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import * as web3 from "@solana/web3.js";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { ToastAction } from "./ui/toast";

export default function Card({
  name,
  img,
  primaryKey,
  privateKey,
  currentBountyBal
}: {
  name: string;
  img: string;
  primaryKey: string;
  privateKey: string;
  currentBountyBal: string
}) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [bal, setBal] = useState<number>();
  const [amount, setAmount] = useState("");
  const [txSig, setTxSig] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0.0);
  const [internalWalletBalance, setInternalWalletBalance] = useState(0.0);

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
      const fbal = bal - parseFloat(currentBountyBal);
      setBal(fbal ? fbal : bal);
    }

    fetchBal();
  }, [primaryKey]);

  useEffect(() => {
    async function fetchWalletBalance() {
      if (publicKey) {
        const balance = await connection.getBalance(publicKey);
        setWalletBalance(balance / web3.LAMPORTS_PER_SOL);
      }
      if (primaryKey) {
        const balance = await connection.getBalance(
          new web3.PublicKey(primaryKey)
        );
        setInternalWalletBalance(balance / web3.LAMPORTS_PER_SOL);
      }
    }

    fetchWalletBalance();
  }, [publicKey, primaryKey, connection]);

  const handleTransaction = async (isAddingFunds: boolean) => {
    if (!connection || !publicKey) {
      toast({
        title: "Error",
        description: "Please connect your wallet first!",
        variant: "destructive",
      });
      return;
    }

    const amountInSol = parseFloat(amount);
    if (amountInSol <= 0) {
      toast({
        title: "Error",
        description: "Amount must be greater than 0!",
        variant: "destructive",
      });
      return;
    }

    if (isAddingFunds && amountInSol > walletBalance) {
      toast({
        title: "Error",
        description: "Insufficient balance in your wallet!",
        variant: "destructive",
      });
      return;
    }

    if (!isAddingFunds && amountInSol > internalWalletBalance) {
      toast({
        title: "Error",
        description: "Insufficient balance in the account!",
        variant: "destructive",
      });
      return;
    }

    isAddingFunds ? setIsAdding(true) : setIsWithdrawing(true);

    try {
      const signature = isAddingFunds
        ? await addFunds(
          publicKey,
          new web3.PublicKey(primaryKey),
          amountInSol,
          sendTransaction
        )
        : await withdrawFunds(privateKey, publicKey, amountInSol);

      setTxSig(signature);

      const newBalance = await getSolBalanaceInUSD(primaryKey);
      setBal(newBalance);

      toast({
        title: "Success",
        description: `${isAddingFunds ? "Transaction" : "Withdrawal"
          } completed successfully.`,
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

      setIsDialogOpen(false);
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
          description: `Transaction failed! Reason: ${(error as any).message}`,
          variant: "destructive",
        });
      }
    } finally {
      setAmount("");
      isAddingFunds ? setIsAdding(false) : setIsWithdrawing(false);
    }
  };

  return (
    <>
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <WalletMultiButton />
        <div className="px-6 py-4 flex flex-col">
          {AccountInfo()}
          <div className="mt-6 flex justify-between items-center">
            <div className="text-3xl font-bold text-gray-900">
              {bal ? "$" + bal.toFixed(2) : "loading..."}{" "}
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

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="!text-sm mt-4">Add / Withdraw Funds</Button>
            </DialogTrigger>
            <DialogContent>
              <div className="p-4 flex flex-col gap-3">
                <Input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount of SOL"
                  className="my-4 p-2 border border-gray-300 rounded"
                />
                <Button
                  className="!text-sm mt-2"
                  onClick={() => handleTransaction(true)}
                  disabled={isAdding}
                >
                  {isAdding ? "Adding..." : "Add"}
                </Button>
                <Button
                  className="!text-sm mt-2"
                  onClick={() => handleTransaction(false)}
                  disabled={isWithdrawing}
                >
                  {isWithdrawing ? "Withdrawing..." : "Withdraw"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
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
