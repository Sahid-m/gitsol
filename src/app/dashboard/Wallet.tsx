"use client";

import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { TransferSol as withdrawFunds } from "@/lib/actions/transfers.actions";
import { addFunds, getSolBalanaceInUSD } from "@/lib/solutils";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import * as web3 from "@solana/web3.js";
import dynamic from "next/dynamic";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";

export function WalletCard3D({
  name,
  img,
  primaryKey,
  privateKey,
  currentBountyBal,
  bounty,
}: {
  name: string;
  img: string;
  primaryKey: string;
  privateKey: string;
  currentBountyBal: string;
  bounty: boolean;
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

  const WalletMultiButtonDynamic = dynamic(
    async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
    { ssr: false }
  );

  useEffect(() => {
    const timeout = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timeout);
  }, [copied]);

  const fetchBal = useCallback(async () => {
    const bal = await getSolBalanaceInUSD(primaryKey);
    const fbal = bal - parseFloat(currentBountyBal);
    setBal(fbal ? fbal : bal);
  }, [primaryKey, currentBountyBal]);
  useEffect(() => {
    fetchBal();
  }, [currentBountyBal, fetchBal, primaryKey]);

  const fetchWalletBalance = useCallback(async () => {
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
  }, [connection, publicKey, primaryKey]);
  useEffect(() => {
    fetchWalletBalance();
  }, [publicKey, primaryKey, connection, fetchWalletBalance]);

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
      toast({
        title: "Error",
        description: `Transaction failed! Reason: ${(error as any).message}`,
        variant: "destructive",
      });
    } finally {
      setAmount("");
      isAddingFunds ? setIsAdding(false) : setIsWithdrawing(false);
      fetchBal();
      fetchWalletBalance();
    }
  };

  return (
    <BackgroundGradient>
      <CardContainer className="inter-var h-full" containerClassName="p-2">
        <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-neutral-950 dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
          <CardItem
            translateZ="50"
            className="text-xl font-bold text-neutral-600 dark:text-white"
          >
            <div className="flex items-center">
              <Image
                alt="Profile"
                className="rounded-full flex items-center justify-center text-xl font-semibold"
                src={img}
                width={50}
                height={50}
              />
              <div className="ml-4">
                <h2 className="text-xl font-semibold text-black dark:text-white">
                  Welcome back, {name}!
                </h2>
                <p className="text-gray-500">Gitsol Account Assets</p>
              </div>
            </div>
          </CardItem>

          <div className="mt-6">
            <CardItem translateZ="100" className="w-full mt-4">
              <div className="md:text-5xl text-3xl text-center font-bold text-gray-900 dark:text-neutral-400">
                {bal ? bal.toFixed(2) : <Skeleton className="h-10" />}{" "}
                <span className="md:text-3xl text-xl px-2 font-medium text-gray-500">
                  USD
                </span>
              </div>
            </CardItem>
            <CardItem translateZ="60" className="w-full mt-4">
              <Button
                className="text-sm w-full items-center justify-center"
                onClick={() => {
                  navigator.clipboard.writeText(primaryKey);
                  setCopied(true);
                }}
              >
                {copied ? "Copied!" : "Your Wallet Address"}
              </Button>
            </CardItem>
          </div>
          <CardItem translateZ={90} className="w-full justify-center flex py-5">
            <WalletMultiButtonDynamic />
          </CardItem>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger className="w-full" asChild>
              <CardItem translateZ={60}>
                <Button className="!text-sm w-full ">
                  Add / Withdraw Funds
                </Button>
              </CardItem>
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
        </CardBody>
      </CardContainer>
    </BackgroundGradient>
  );
}
