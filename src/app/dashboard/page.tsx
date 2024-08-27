import db from "@/db";
import { getUserWallet } from "@/lib/actions/wallet.actions";
import { getCurrentUser } from '@/lib/session';
import { redirect } from 'next/navigation';
import React, { useMemo } from 'react';
import { WalletCard3D } from "./Wallet";


export default async function Dashboard() {

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
        <div className="h-screen items-center justify-center  flex bg-neutral-200 dark:bg-neutral-900">
            <WalletCard3D
                primaryKey={wallet?.publicKey ?? ""}
                privateKey={wallet?.privateKey ?? ""}
                img={user?.image}
                name={user?.name ?? ""}
                currentBountyBal={wallet.CurrentBountyBal}
                bounty={true}
            />
        </div>
    )
}



