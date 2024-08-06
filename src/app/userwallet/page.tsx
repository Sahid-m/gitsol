
import Card from '@/components/Card';
import db from '@/db';
import { authConfig } from '@/lib/authconfig';
import { getServerSession } from 'next-auth';
import React from 'react';

export default async function Wallet() {



    const data = await getServerSession(authConfig);

    if (!data?.user || !data) {
        return (
            <div className=''>
                <div className='h-screen flex justify-center items-center'>
                    <h1>Unauthorized</h1>
                </div>
            </div>
        )
    }

    return (
        <div className='h-screen flex justify-center items-center'>
            <div className=''>
                <Card primaryKey={await getUserWallet(data.user.uid) ?? ""} img={data?.user?.image} name={data?.user?.name ?? ''} />
            </div>

        </div>
    )
}

async function getUserWallet(uid: string) {

    const data = await db.solWallet.findFirst({
        where: {
            userid: uid
        },
        select: {
            publicKey: true
        }
    })

    return data?.publicKey;

}
