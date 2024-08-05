'use client'

import React, { useEffect, useState } from 'react';
import PrimaryButton from './Button';

export default function Card({ name, img, bal, primaryKey }: { name: string; img: string; bal: string; primaryKey: string }) {

    const [copied, setCopied] = useState(false);

    useEffect(() => {

        const copied = setTimeout(() => {
            setCopied(false);
        }, 2000)

        return () => {
            clearTimeout(copied)
        }
    }, [copied])
    return (
        <>
            <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="px-6 py-4">
                    {AccountInfo()}
                    <div className="mt-6 flex justify-between items-center">
                        <div className="text-3xl font-bold text-gray-900">${bal} <span className="text-lg font-medium text-gray-500">USD</span></div>
                        <PrimaryButton className='!text-sm' onClick={() => {
                            navigator.clipboard.writeText(primaryKey);
                            setCopied(true);
                        }}>{copied ? "Copied!" : "Your Wallet Address"}</PrimaryButton>
                    </div>
                </div>

            </div>
        </>
    )

    function AccountInfo() {
        return <div className="flex items-center">
            <img className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-semibold" src={img} />
            <div className="ml-4">
                <h2 className="text-xl font-semibold text-gray-900">Welcome back, {name}!</h2>
                <p className="text-gray-500">Gitsol Account Assets</p>
            </div>
        </div>;
    }
}
