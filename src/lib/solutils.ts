import {
  clusterApiUrl,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionResponse,
} from "@solana/web3.js";
import crypto from "crypto";

export const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

export async function getSolBalanaceInUSD(publicKey: string): Promise<number> {
  let wallet = new PublicKey(publicKey);

  const userSol = (await connection.getBalance(wallet)) / LAMPORTS_PER_SOL;

  const response = await fetch("https://price.jup.ag/v6/price?ids=SOL", {
    method: "GET",
  });

  const data = await response.json();

  const currentPrice = data.data?.SOL?.price ?? 0;

  const userBal = userSol * currentPrice;

  return userBal;
}

export async function getTransactions(
  publicKey: string
): Promise<(TransactionResponse | null)[]> {
  try {
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

    return transactions;
  } catch (error) {
    console.error("Failed to get transactions:", error);
    return [];
  }
}

export function isValidPublicKey(inputValue: string): boolean {
  try {
    new PublicKey(inputValue);
    return true;
  } catch (error) {
    return false;
  }
}

export async function addFunds(
  fromPublicKey: PublicKey,
  toPublicKey: PublicKey,
  amount: number,
  sendTransaction: (
    transaction: Transaction,
    connection: Connection
  ) => Promise<string>
): Promise<string> {
  const transaction = new Transaction();
  const instruction = SystemProgram.transfer({
    fromPubkey: fromPublicKey,
    lamports: amount * LAMPORTS_PER_SOL,
    toPubkey: toPublicKey,
  });

  transaction.add(instruction);

  try {
    const signature = await sendTransaction(transaction, connection);
    return signature;
  } catch (error) {
    console.error("Transaction Error:", error);
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

export function stringToUInt8Array(input: string) {
  try {
    const data = Uint8Array.from(input.split(",").map(Number));
    return data;
  } catch (e) {
    console.log("error converting to Uint8Arry : " + e);
    return null;
  }
}

export function decryptStrings(
  encryptedData: string,
  key: string,
  iv: string
): [string, string] {
  // Create decipher
  console.log("in decrypt string start");
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(key, "hex"),
    Buffer.from(iv, "hex")
  );
  console.log("created deciper");
  console.log("encrypted key : " + key);
  console.log("iv: " + iv);

  // Decrypt the data
  let decrypted = decipher.update(encryptedData, "hex", "utf8");
  decrypted += decipher.final("utf8");

  console.log("decrypted");
  // Split the decrypted string back into two strings
  const [str1, str2] = decrypted.split("|");

  return [str1, str2];
}
