"use server";

import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { connection } from "../solutils";

export async function TransferSol(
  fromPrivateKey: string,
  toPublicKey: PublicKey,
  amount: number
): Promise<string> {
  const fromKeypair = Keypair.fromSecretKey(
    Uint8Array.from(fromPrivateKey.split(",").map(Number))
  );
  const transaction = new Transaction();
  const instruction = SystemProgram.transfer({
    fromPubkey: fromKeypair.publicKey,
    lamports: amount * LAMPORTS_PER_SOL,
    toPubkey: toPublicKey,
  });

  transaction.add(instruction);

  try {
    const signature = await sendAndConfirmTransaction(connection, transaction, [
      fromKeypair,
    ]);
    return signature;
  } catch (error) {
    console.error("Transaction Error:", error);

    throw new Error("Transaction failed!");
  }
}

export async function transferAllSOL(
  walletPrivateKey: string,
  toWalletPubKey: string
): Promise<string> {
  // Get the balance of the fromWallet
  const fromWallet = Keypair.fromSecretKey(
    Uint8Array.from(walletPrivateKey.split(",").map(Number))
  );

  const toWallet = new PublicKey(toWalletPubKey);
  const fromWalletBalance = await connection.getBalance(fromWallet.publicKey);

  if (fromWalletBalance == 0 || fromWalletBalance < 0) {
    throw new Error("No Balance in parent wallet");
  }

  const transaction = new Transaction();
  transaction.feePayer = fromWallet.publicKey;
  transaction.recentBlockhash = (
    await connection.getLatestBlockhash()
  ).blockhash;

  const fee = await transaction.getEstimatedFee(connection);

  if (!fee) {
    throw new Error("Internal Server Error!");
  }

  if (fee >= fromWalletBalance) {
    throw new Error("Not Enough Balance in wallet");
  }

  const instruction = SystemProgram.transfer({
    fromPubkey: fromWallet.publicKey,
    lamports: fromWalletBalance - fee,
    toPubkey: toWallet,
  });

  transaction.add(instruction);

  try {
    const signature = await sendAndConfirmTransaction(connection, transaction, [
      fromWallet,
    ]);
    return signature;
  } catch (error) {
    console.error("Transaction Error:", error);

    throw new Error("Transaction failed!");
  }
}
