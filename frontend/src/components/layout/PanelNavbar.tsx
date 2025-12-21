'use client'
import Link from 'next/link';
import React, { useState, useEffect } from 'react'
import { MdLogout, MdMenu, MdClose } from "react-icons/md"; // Menu ikonları eklendi
import { FaRegMoon } from "react-icons/fa";
import { IoSunny, IoMoon } from "react-icons/io5";
import { usePathname, useRouter } from 'next/navigation';
import { authService } from '@/services/auth.service';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from 'next-themes';

function PanelNavbar() {
    const router = useRouter();
    const pathName = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobil menü durumu
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleLogout = () => {
        authService.logout();
        router.push('/login');
    };

    const isActive = (path: string) => {
        return pathName.startsWith(path);
    };

    const { user } = useAuth();

    return (
        <header className="bg-white dark:bg-[#0f172a] 2xl:py-8 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 transition-colors duration-300">
            {/* max-w-screen-xl: İçeriği 1280px genişliğe sabitler (Büyük ekranlarda dağılmayı önler)
                mx-auto: Ortalar
                px-4 sm:px-6 lg:px-8: Responsive padding (Telefonda az, bilgisayarda çok boşluk)
            */}
            <nav className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">

                    {/* SOL TARAF: LOGO */}
                    <div className="flex items-center flex-shrink-0">
                        <Link href="/" className="flex items-center gap-2">
                            <img
                                src={`https://wcanx.co/logo.png`}
                                alt="WcanX Logo"
                                className="h-8  2xl:h-16 w-auto"
                            />
                            <span className="self-center text-xl  2xl:text-5xl font-semibold whitespace-nowrap text-gray-800 dark:text-white hidden sm:block">
                                WcanX Case
                            </span>
                        </Link>
                    </div>

                    {/* ORTA TARAF: DESKTOP MENÜ (Mobilde gizlenir 'hidden md:block') */}
                    <div className="hidden md:block">
                        <ul className='flex space-x-8 font-semibold text-gray-800 dark:text-gray-200'>
                            <li>
                                <Link
                                    href={"/dashboard"}
                                    className={`py-2 text-sm 2xl:text-3xl font-medium transition-colors duration-300 ${isActive('/dashboard') ? 'text-green-600 border-b-2 border-green-600 dark:text-green-400 dark:border-green-400' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'}`}
                                >
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={"/transactions"}
                                    className={`py-2 text-sm 2xl:text-3xl font-medium transition-colors duration-300 ${isActive('/transactions') ? 'text-green-600 border-b-2 border-green-600 dark:text-green-400 dark:border-green-400' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'}`}
                                >
                                    İşlemler
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* SAĞ TARAF: KULLANICI & MOBİL BUTON */}
                    <div className="flex items-center gap-2 sm:gap-4">

                        {/* Kullanıcı Bilgisi (Telefonda yazıyı gizle 'hidden sm:flex') */}
                        <div className='flex items-center gap-2 2xl:mr-16'>
                            <div className='flex justify-center items-center w-8 2xl:w-12 h-8 2xl:h-12 rounded-full border-2 font-semibold border-orange-400 bg-gray-100 dark:bg-gray-800 dark:text-white text-sm 2xl:text-2xl'>
                                {user?.firstName[0]}
                            </div>
                            <div className='hidden sm:flex flex-col'>
                                <span className='text-[10px] 2xl:text-lg text-gray-500 dark:text-gray-400 leading-tight'>Hoşgeldin</span>
                                <span className='text-xs 2xl:text-2xl font-bold text-gray-700 dark:text-white leading-tight'>{user?.firstName} {user?.lastName[0]}.</span>
                            </div>
                        </div>

                        {/* Aksiyon Butonları */}
                        {mounted && (
                            <button
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                className='p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer'
                            >
                                {theme === 'dark' ? (
                                    <IoSunny className='text-gray-600 dark:text-yellow-400 text-xl 2xl:text-3xl' />
                                ) : (
                                    <IoMoon className='text-gray-600 dark:text-white text-xl 2xl:text-3xl' />
                                )}
                            </button>
                        )}
                        <button onClick={handleLogout} className='p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/30 transition group cursor-pointer'>
                            <MdLogout className="text-xl 2xl:text-3xl text-gray-600 dark:text-gray-400 group-hover:text-red-600 dark:group-hover:text-red-400 transition duration-200" />
                        </button>

                        {/* Mobil Menü Açma Butonu (Sadece mobilde görünür 'md:hidden') */}
                        <div className="-mr-2 flex md:hidden">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                type="button"
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-500 dark:hover:text-white focus:outline-none"
                            >
                                <span className="sr-only">Menüyü aç</span>
                                {isMobileMenuOpen ? (
                                    <MdClose className="block h-6 w-6" aria-hidden="true" />
                                ) : (
                                    <MdMenu className="block h-6 w-6" aria-hidden="true" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* MOBİL MENÜ İÇERİĞİ (State true ise görünür) */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white dark:bg-[#0f172a] border-b border-gray-200 dark:border-gray-800">
                    <div className="space-y-1 px-4 pb-3 pt-2 sm:px-3">
                        <Link
                            href="/dashboard"
                            className={`block rounded-md px-3 py-2 text-base font-medium ${isActive('/dashboard') ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Dashboard
                        </Link>
                        <Link
                            href="/transactions"
                            className={`block rounded-md px-3 py-2 text-base font-medium ${isActive('/transactions') ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            İşlemler
                        </Link>
                    </div>
                </div>
            )}
        </header>
    )
}

export default PanelNavbar
