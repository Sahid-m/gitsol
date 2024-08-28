"use server";

import db from "@/db";
import {
  clusterApiUrl,
  Connection,
  PublicKey,
  TransactionResponse,
} from "@solana/web3.js";
import { connection } from "../solutils";

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

export async function getPrBountiesDetails(token: string, sub: string) {
  try {
    const data = await db.prBounties.findFirst({
      where: {
        token: token,
        winnerSub: sub,
      },
    });

    return data;
  } catch (e) {
    console.log("error");
    console.log(e);
    return null;
  }
}
