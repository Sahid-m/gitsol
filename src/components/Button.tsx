'use client'

import React from 'react'

interface PrimaryButtonProps {
    children: React.ReactNode
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    className?: string
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
    children,
    onClick,
    className,
}) => {
    return (
        <button
            onClick={onClick}
            className={`md:w-100 w-fit min-w-fit h-14 rounded-lg py-2 px-6 bg-slate-900  text-white md:text-base  font-semibold hover:bg-slate-600 transition-colors duration-300 ease-in-out ${className}`}
        >
            {children}
        </button>
    )
}

export default PrimaryButton