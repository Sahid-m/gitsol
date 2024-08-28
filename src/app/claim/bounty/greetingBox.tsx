'use client';

import { Cover } from '@/components/ui/cover';
import { Skeleton } from '@/components/ui/skeleton';
import { getSolBalanaceInUSD } from '@/lib/solutils';
import React, { useCallback, useEffect, useState } from 'react';

export default function GreetingBox({ primaryKey }: {
    primaryKey: string;
}) {

    const [bal, setBal] = useState<number | null>(null);
    const [lastFetchTime, setLastFetchTime] = useState<number | null>(null);

    const fetchBal = useCallback(async () => {
        const bal = await getSolBalanaceInUSD(primaryKey);
        setBal(bal);
        setLastFetchTime(Date.now());
    }, [primaryKey]);



    useEffect(() => {
        const now = Date.now();

        // If the balance is null or the last fetch was over 1 minute ago, fetch the balance
        if (bal === null || (lastFetchTime && now - lastFetchTime > 60000)) {
            fetchBal();
        }

        // Set up an interval to fetch the balance every 1 minute
        const intervalId = setInterval(fetchBal, 60000);

        return () => clearInterval(intervalId); // Clear interval on unmount
    }, [bal, lastFetchTime, fetchBal]);

    return (
        <>
            <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-300 to-neutral-900 dark:from-neutral-100 dark:to-neutral-500 py-8">
                Congratulations!
            </p>
            <h1 className='text-2xl md:text-2xl lg:text-3xl font-semibold max-w-7xl mx-auto text-center  relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white'>
                For Winning Bounty of {bal !== null && bal !== undefined ? (
                    bal > 0 ? (
                        <Cover>${bal.toFixed(2)}</Cover>
                    ) : (
                        <Cover>$0.00</Cover> // or any other component/message you want to display for zero balance
                    )
                ) : (
                    <Skeleton className="h-10 w-10 items-center align-middle inline-block" />
                )}
            </h1>
        </>
    )
}
