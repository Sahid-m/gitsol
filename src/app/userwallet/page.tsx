import Card from "@/components/Card";
import db from "@/db";
import { authConfig } from "@/lib/authconfig";
import { getCurrentUser } from "@/lib/session";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function Wallet() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/signin");
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="">
        <Card
          primaryKey={(await getUserWallet(user.uid)) ?? ""}
          img={user?.image}
          name={user?.name ?? ""}
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
    },
  });
  return data?.publicKey;
}
