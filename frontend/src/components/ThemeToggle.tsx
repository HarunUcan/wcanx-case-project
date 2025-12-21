"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { IoMoon, IoSunny } from "react-icons/io5";
export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) {
        return <div className="w-8 h-8" />; // Placeholder to avoid hydration mismatch
    }
    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer"
            aria-label="Toggle Dark Mode"
        >
            {theme === "dark" ? (
                <IoSunny className="text-gray-600 dark:text-yellow-400 text-xl 2xl:text-3xl" />
            ) : (
                <IoMoon className="text-gray-600 dark:text-gray-200 text-xl 2xl:text-3xl" />
            )}
        </button>
    );
}