import { BountyCard } from "@/components/BountyCard";
import { Card } from "@/components/ui/card";
import { getAllUserBounties } from '@/lib/actions/bounties.actions';
import { getCurrentUser } from '@/lib/session';
import Link from "next/link";
import { redirect } from 'next/navigation';
import React from 'react';

export default async function MyBounties() {

    const user = await getCurrentUser();
    if (!user) {
        redirect("/signin");
    }

    const bounties = await getAllUserBounties(user.uid);

    return (
        <div className=" p-6">
            <h1 className="text-3xl font-bold mb-4">Your Bounties</h1>
            <Card className="mx-auto border-0">
                <div className="grid grid-cols-1 gap-6 bg-neutral-200 dark:bg-neutral-900 border-0">
                    {bounties.map((bounty) => (
                        <BountyCard key={bounty.id} bounty={bounty} />
                    ))}
                </div>
            </Card>
        </div>
    );
}

