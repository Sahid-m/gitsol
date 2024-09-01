
import Card from '@/components/Card';
import { Cover } from '@/components/ui/cover';
import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input';
import { getPrBountiesDetails, getWinnerBountyWalletDetails } from '@/lib/actions/wallet.actions';
import { getCurrentUser } from '@/lib/session';
import { Keypair } from '@solana/web3.js';
import { redirect } from 'next/navigation';
import React from 'react';
import GreetingBox from './greetingBox';
import InputBox from './inputBox';

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

    // const data = await getPrBountiesDetails(token, user.sub);
    const privateKey = await getWinnerBountyWalletDetails(token, user.sub);

    if (!privateKey) {
        return (<div className='h-screen flex justify-center items-center'>
            WRONG TOKEN
        </div>)
    }


    const KeyPair = Keypair.fromSecretKey(privateKey);

    const primaryKey = KeyPair.publicKey.toBase58();


    return (
        <div className='h-screen flex justify-center items-center'>
            <div className="h-full w-full dark:bg-black bg-neutral-200  dark:bg-grid-white/[0.08] bg-grid-black/[0.08] relative flex items-center justify-center">
                {/* Radial gradient for the container to give a faded look */}
                <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-neutral-900 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
                <div className='h-full flex flex-col'>
                    <div className='flex flex-col justify-center items-center'>
                        <GreetingBox primaryKey={primaryKey} />
                    </div>
                    <div className='my-10 '>
                        <InputBox walletPrivateKey={privateKey.toString()} />
                    </div>
                    <div className='flex justify-center items-center'>
                        <img className='' src='/images/meme.jpg' width={400} height={400} />
                    </div>
                </div>


            </div>
        </div>
    )
}
