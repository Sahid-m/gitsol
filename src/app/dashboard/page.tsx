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
        <div className="h-screen items-center justify-center  flex">
            {/* <Tabs defaultValue="wallet" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="wallet">Wallet</TabsTrigger>
                    <TabsTrigger value="transaction">Your Transactions</TabsTrigger>
                </TabsList>
                <TabsContent value="wallet">
                    <WalletCard
                        primaryKey={wallet?.publicKey ?? ""}
                        privateKey={wallet?.privateKey ?? ""}
                        img={user?.image}
                        name={user?.name ?? ""}
                        currentBountyBal={wallet.CurrentBountyBal}
                        bounty={true}
                    />
                </TabsContent>
                <TabsContent value="transaction" className="">

                    <TransactionList publicKey={wallet.publicKey} />

                </TabsContent>
            </Tabs> */}
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



