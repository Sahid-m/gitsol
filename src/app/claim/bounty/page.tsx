import Card from '@/components/Card';
import { getPrBountiesDetails } from '@/lib/actions/wallet.actions';
import { getCurrentUser } from '@/lib/session';
import { Keypair } from '@solana/web3.js';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function ClaimBounty({
    searchParams
}: {
    searchParams: { token?: string }
}) {

    const user = await getCurrentUser();
    if (!user) {
        redirect("/signin");
    }

    const token = searchParams.token;

    if (!token) {
        return (<div className='h-screen flex justify-center items-center'>
            WRONG LINK SER
        </div>)
    }

    const data = await getPrBountiesDetails(token, user.sub);

    if (!data) {
        return (<div className='h-screen flex justify-center items-center'>
            WRONG TOKEN
        </div>)
    }

    const KeyPair = Keypair.fromSecretKey(Uint8Array.from(data.walletPrivateKey.split(",").map(Number)))


    return (
        <div className='h-screen flex justify-center items-center'>
            <Card
                currentBountyBal='0'
                img={user.image}
                name={user.name}
                primaryKey={KeyPair.publicKey.toBase58()}
                privateKey={KeyPair.secretKey.toString()}
                bounty={true}
            />
        </div>
    )
}
