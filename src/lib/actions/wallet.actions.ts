import db from "@/db";
import {
  clusterApiUrl,
  Connection,
  PublicKey,
  TransactionResponse,
} from "@solana/web3.js";
import { connection } from "../solutils";

export async function getTransactions(
  publicKey: string
): Promise<TransactionResponse[]> {
  const pubKey = new PublicKey(publicKey);

  // Fetch signatures for transactions involving the public key
  const signatures = await connection.getSignaturesForAddress(pubKey);

  // Fetch transaction details for each signature
  const transactions = await Promise.all(
    signatures.map(async (signatureInfo) => {
      const transaction = await connection.getTransaction(
        signatureInfo.signature
      );
      return transaction;
    })
  );

  // Filter out null transactions (in case some transactions could not be fetched)
  return transactions.filter((tx): tx is TransactionResponse => tx !== null);
}

export async function getUserWallet(uid: string) {
  const data = await db.solWallet.findFirst({
    where: {
      userid: uid,
    },
    select: {
      publicKey: true,
      privateKey: true,
      CurrentBountyBal: true,
    },
  });
  return data;
}
