import { getSolBalanaceInUSD } from "@/lib/solutils";
import {
  clusterApiUrl,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
} from "@solana/web3.js";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userPublicKey = searchParams.get("publicKey") as unknown as string;

  const userBal = await getSolBalanaceInUSD(userPublicKey);

  return NextResponse.json(
    {
      bal: userBal,
    },
    {
      status: 200,
    }
  );
}
