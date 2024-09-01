"use server";

import db from "@/db";
import crypto from "crypto";
import { combine } from "shamir-secret-sharing";
import { decryptStrings, stringToUInt8Array } from "../solutils";

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

export async function getWinnerBountyWalletDetails(
  token: string,
  sub: string
): Promise<[Uint8Array, string] | null> {
  try {
    const data = await db.bountyWinner.findFirst({
      where: {
        winnerSub: sub,
        tokenPrefix: token.slice(0, 20),
      },
    });

    console.log("Winner Sub " + data?.winnerSub);

    if (!data) {
      console.log("could'nt get db data");
      return null;
    }

    const [share1String, winnerSub] = decryptStrings(
      token,
      data.encryptionKey.toString(),
      data.encryptionIv.toString()
    );

    console.log("Winner Sub Decrypted " + winnerSub);

    if (winnerSub !== sub) {
      return null;
    }

    const share1 = stringToUInt8Array(share1String);
    const share2 = stringToUInt8Array(data.walletPrivateKeyShard);

    if (!share1 || !share2) {
      console.log("error share1 or share2 empty");
      return null;
    }

    const reconstructed = await combine([share1, share2]);

    if (!reconstructed) {
      console.log("recon fail");
      return null;
    }
    console.log("recon success");

    return [reconstructed, data.id];
  } catch (e) {
    console.log("error");
    console.log(e);
    return null;
  }
}
