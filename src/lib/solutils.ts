import {
  clusterApiUrl,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
} from "@solana/web3.js";

export async function getSolBalanaceInUSD(publicKey: string): Promise<number> {
  let wallet = new PublicKey(publicKey);

  const userSol = (await connection.getBalance(wallet)) / LAMPORTS_PER_SOL;

  const responce = await fetch("https://price.jup.ag/v6/price?ids=SOL", {
    method: "GET",
  });

  const data = await responce.json();

  console.log(data);
  console.log(data.data.SOL);

  const currentPrice = data.data.SOL.price;

  const userBal = userSol * currentPrice;

  return userBal;
}

export const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
