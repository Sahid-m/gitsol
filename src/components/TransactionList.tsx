'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getTransactions } from "@/lib/solutils";
import { TransactionResponse } from "@solana/web3.js";
import { Copy } from "lucide-react"; // Assuming Lucide React icons are being used
import { useEffect, useState } from "react";

export const TransactionList = ({ publicKey }: { publicKey: string }) => {
    const [transactions, setTransactions] = useState<(TransactionResponse | null)[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchTransactions = async () => {
            setLoading(true);
            const fetchedTransactions = await getTransactions(publicKey);
            setTransactions(fetchedTransactions);
            setLoading(false);
        };

        fetchTransactions();
    }, [publicKey]);

    if (loading) {
        return (
            <div className="space-y-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
            </div>
        );
    }

    if (!transactions) {
        return (
            <div className="">
                No Transactions
            </div>
        )
    }

    return (
        <div className="space-y-2">
            {transactions.map((tx, index) => {

                if (!tx) return (<>No Transactions</>)
                const fromAddress = tx.transaction.message.accountKeys[0].toBase58();
                const toAddress = tx.transaction.message.accountKeys[1].toBase58();
                //@ts-ignore
                const amountInLamports = tx.meta?.postBalances[1] - tx.meta?.preBalances[1];
                const amountInSOL = amountInLamports / 1_000_000_000;

                return (
                    <Card key={index} className="bg-slate-900 text-white rounded-lg p-4 flex justify-between items-center">
                        <div className="flex flex-col space-y-1">
                            <div className="flex items-center space-x-2">
                                <span className="text-sm">
                                    <strong>From:</strong> {fromAddress === publicKey ? "You" : fromAddress.slice(0, 5) + "..." + fromAddress.slice(-5)}
                                </span>
                                <Copy className="h-4 w-4 cursor-pointer" onClick={() => navigator.clipboard.writeText(fromAddress)} />
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-sm">
                                    <strong>To:</strong> {toAddress === publicKey ? "You" : toAddress.slice(0, 5) + "..." + toAddress.slice(-5)}
                                </span>
                                <Copy className="h-4 w-4 cursor-pointer" onClick={() => navigator.clipboard.writeText(toAddress)} />
                            </div>
                        </div>
                        <div className="flex flex-col items-end space-y-1">
                            <span className="text-sm">{amountInSOL.toFixed(6)} SOL</span>
                            <span className="text-xs text-gray-500">
                                {tx.blockTime ? new Date(tx.blockTime * 1000).toLocaleString() : 'N/A'}
                            </span>
                            <span className="text-xs text-green-400">{tx.meta?.err ? 'Failed' : 'Success'}</span>
                        </div>
                    </Card>
                );
            })}
        </div>
    );
};


