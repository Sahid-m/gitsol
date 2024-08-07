import {
  clusterApiUrl,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";

export const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

export async function getSolBalanaceInUSD(publicKey: string): Promise<number> {
  let wallet = new PublicKey(publicKey);

  const userSol = (await connection.getBalance(wallet)) / LAMPORTS_PER_SOL;

  const response = await fetch("https://price.jup.ag/v6/price?ids=SOL", {
    method: "GET",
  });

  const data = await response.json();

  console.log(data);
  console.log(data.data.SOL);

  const currentPrice = data.data?.SOL?.price ?? 0;

  const userBal = userSol * currentPrice;

  return userBal;
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

    throw new Error("Transaction failed!");
  }
}
