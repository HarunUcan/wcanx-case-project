'use client'
import Link from 'next/link';
import React, { useState } from 'react'
import { MdMenu, MdClose } from "react-icons/md"; // Menu ikonları eklendi
import { ThemeToggle } from '../ThemeToggle'; // Import Path adjusted based on file structure
import NavigationButton from '../home/NavigationButton';

function Navbar() {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobil menü durumu

    return (
        <header className="bg-white dark:bg-[#0f172a] 2xl:py-8 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 transition-colors duration-300">
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



                    {/* SAĞ TARAF: KULLANICI & MOBİL BUTON */}
                    <div className="flex items-center gap-2 sm:gap-4">

                        {/* ORTA TARAF: DESKTOP MENÜ (Mobilde gizlenir 'hidden md:block') */}
                        <div className="hidden md:block">
                            <ul className='flex space-x-2 font-semibold text-gray-800 dark:text-gray-200'>
                                <li>
                                    <NavigationButton className='sm:py-2.5' href="/register" variant="primary">
                                        Kayıt Ol
                                    </NavigationButton>
                                </li>
                                <li>
                                    <NavigationButton className='sm:py-2.5' href="/login" variant="secondary">
                                        Giriş Yap
                                    </NavigationButton>
                                </li>
                            </ul>
                        </div>

                        {/* Aksiyon Butonları */}
                        <ThemeToggle />

                        {/* Mobil Menü Açma Butonu (Sadece mobilde görünür 'md:hidden') */}
                        <div className="-mr-2 flex md:hidden">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                type="button"
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-500 focus:outline-none"
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
                <div className="md:hidden bg-white dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-gray-800">
                    <div className="space-y-1 px-4 pb-3 pt-2 sm:px-3">
                        <Link
                            href="/register"
                            className={`block rounded-md px-3 py-2 text-base font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800`}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Kayıt Ol
                        </Link>
                        <Link
                            href="/login"
                            className={`block rounded-md px-3 py-2 text-base font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800`}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Giriş Yap
                        </Link>
                    </div>
                </div>
            )}
        </header>
    )
}

export default Navbar
