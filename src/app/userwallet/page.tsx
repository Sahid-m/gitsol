import Card from "@/components/Card";
import db from "@/db";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import React from "react";

export default async function Wallet() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/signin");
  }

  const wallet = await getUserWallet(user.uid);

  if (!wallet) {
    return (<div className="h-screen flex justify-center items-center">
      No wallet
    </div>)
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="">
        <Card
          primaryKey={wallet?.publicKey ?? ""}
          privateKey={wallet?.privateKey ?? ""}
          img={user?.image}
          name={user?.name ?? ""}
          currentBountyBal={wallet.CurrentBountyBal}
        />
      </div>
    </div>
  );
}

async function getUserWallet(uid: string) {
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
