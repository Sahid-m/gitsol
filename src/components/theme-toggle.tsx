"use client"
import { IconMoon, IconSun } from '@tabler/icons-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <button onClick={toggleTheme} className="p-2 rounded-full items-center" aria-label="Toggle theme">
            {theme === 'light' ? (
                <IconMoon className="h-6 w-6 text-neutral-500 dark:text-white" />
            ) : (
                <IconSun className="h-6 w-6 text-neutral-500 dark:text-white" />
            )}
        </button>
    );
};
