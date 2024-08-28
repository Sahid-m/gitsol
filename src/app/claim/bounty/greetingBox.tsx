'use client';

import { Cover } from '@/components/ui/cover';
import { Skeleton } from '@/components/ui/skeleton';
import { getSolBalanaceInUSD } from '@/lib/solutils';
import React, { useCallback, useEffect, useState } from 'react';

export default function GreetingBox({ primaryKey }: {
    primaryKey: string;
}) {

    const [amount, setAmount] = useState("");
    const [bal, setBal] = useState<number>();

    const fetchBal = useCallback(async () => {
        const bal = await getSolBalanaceInUSD(primaryKey);
        setBal(bal);
    }, [primaryKey]);
    useEffect(() => {
        fetchBal();
    }, [fetchBal]);

    return (
        <>
            <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-300 to-neutral-900 dark:from-neutral-100 dark:to-neutral-500 py-8">
                Congratulations!
            </p>
            <h1 className='text-2xl md:text-2xl lg:text-3xl font-semibold max-w-7xl mx-auto text-center  relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white'>
                For Winning Bounty of {bal ? <Cover>${bal.toFixed(2)}</Cover> : <Skeleton className="h-10 w-10  items-center align-middle inline-block" />}
            </h1>
        </>
    )
}
