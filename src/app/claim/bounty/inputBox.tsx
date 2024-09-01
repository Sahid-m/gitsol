'use client'

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input';
import { ToastAction } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { updateClaimTime } from "@/lib/actions/bounties.actions";
import { transferAllSOL } from "@/lib/actions/transfers.actions";
import { isValidPublicKey } from "@/lib/solutils";
import { Keypair, PublicKey } from "@solana/web3.js";
import React, { useState } from 'react';

export default function InputBox({ walletPrivateKey, winnerId }: {
    walletPrivateKey: string,
    winnerId: string
}) {
    const [inputValue, setInputValue] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { toast } = useToast();


    const placeholders = [
        "Your Solana Public Key Here to Claim Your Bounty!",
        "Give Your Public Key!",
        "Make Sure its yours",
        "You cannot undo the transfer!",
        "Verify your public key twice!",
    ];


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleConfirm = async () => {
        // Perform the action when input is confirmed
        setIsDialogOpen(false);

        try {

            const transaction = await transferAllSOL(walletPrivateKey, inputValue);


            if (!transaction) {
                throw new Error("Transaction Failed")
            }

            const data = await updateClaimTime(winnerId);

            toast({
                title: "Success",
                description: "Transaction Successful",
                variant: "default",
                action: (
                    <ToastAction
                        altText="View Transaction"
                        onClick={() =>
                            window.open(
                                `https://explorer.solana.com/tx/${transaction}?cluster=devnet`,
                                "_blank"
                            )
                        }
                    >
                        View Transaction
                    </ToastAction>
                ),
            });

        } catch (error) {
            console.log(error);
            toast({
                title: "Error",
                description: "error: " + error,
                variant: "destructive",
            });
        }


        // Add your logic here for what happens after confirmation
    };

    const handleCancel = () => {
        setIsDialogOpen(false);
        // Optionally, you can clear the input or keep it as is
        // setInputValue('');
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isValidPublicKey(inputValue)) {
            toast({
                title: "Input Error",
                description: "Please check your public key",
                variant: "destructive",
            });
            return;
        }
        setIsDialogOpen(true);
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <PlaceholdersAndVanishInput
                placeholders={placeholders}
                onChange={handleChange}
                onSubmit={onSubmit}
            />
            <Toaster />
            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Your Input</AlertDialogTitle>
                        <AlertDialogDescription>
                            You entered: {inputValue}
                            <br />
                            Are you sure this is correct? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleConfirm}>Confirm</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </div>
    );
}