'use client'

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input';
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import React, { useState } from 'react';

export default function InputBox() {
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
        console.log(e.target.value);
        setInputValue(e.target.value);
    };

    const handleConfirm = () => {
        // Perform the action when input is confirmed
        console.log("Input confirmed:", inputValue);
        setIsDialogOpen(false);
        toast({
            title: "Done",
            description: "Successfully transfered sol",
            variant: "destructive",
        });
        // Add your logic here for what happens after confirmation
    };

    const handleCancel = () => {
        setIsDialogOpen(false);
        // Optionally, you can clear the input or keep it as is
        // setInputValue('');
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("submitted");
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