import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import db from "../../../db";
import { authConfig } from "../../../lib/authconfig";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userPublicKey = searchParams.get("publicKey");

  const data = await getServerSession(authConfig);

  const user_wallet = db.solWallet.findFirst({
    where: {
      userid: data?.user.uid,
    },
  });
}

function getSolanaBalance(publicKey: string) {}
