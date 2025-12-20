'use client'
import Link from 'next/link';
import React, { useState } from 'react'
import { MdLogout, MdMenu, MdClose } from "react-icons/md"; // Menu ikonları eklendi
import { FaRegMoon } from "react-icons/fa";
import { usePathname, useRouter } from 'next/navigation';
import { authService } from '@/services/auth.service';

function PanelNavbar() {
    const router = useRouter();
    const pathName = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobil menü durumu

    const handleLogout = () => {
        authService.logout();
        router.push('/login');
    };

    const isActive = (path: string) => {
        return pathName.startsWith(path);
    };

    return (
        <header className="bg-white 2xl:py-8 border-b border-gray-200 sticky top-0 z-50">
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
                            <span className="self-center text-xl  2xl:text-5xl font-semibold whitespace-nowrap text-gray-800 hidden sm:block">
                                WcanX Case
                            </span>
                        </Link>
                    </div>

                    {/* ORTA TARAF: DESKTOP MENÜ (Mobilde gizlenir 'hidden md:block') */}
                    <div className="hidden md:block">
                        <ul className='flex space-x-8 font-semibold text-gray-800'>
                            <li>
                                <Link
                                    href={"/dashboard"}
                                    className={`py-2 text-sm 2xl:text-3xl font-medium transition-colors duration-300 ${isActive('/dashboard') ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-gray-900'}`}
                                >
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={"/transactions"}
                                    className={`py-2 text-sm 2xl:text-3xl font-medium transition-colors duration-300 ${isActive('/transactions') ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-gray-900'}`}
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
                            <div className='flex justify-center items-center w-8 2xl:w-12 h-8 2xl:h-12 rounded-full border-2 font-semibold border-orange-400 bg-gray-100 text-sm 2xl:text-2xl'>
                                A
                            </div>
                            <div className='hidden sm:flex flex-col'>
                                <span className='text-[10px] 2xl:text-lg text-gray-500 leading-tight'>Hoşgeldin</span>
                                <span className='text-xs 2xl:text-2xl font-bold text-gray-700 leading-tight'>Ahmet Y.</span>
                            </div>
                        </div>

                        {/* Aksiyon Butonları */}
                        <button className='p-1 rounded-full hover:bg-gray-100 transition'>
                            <FaRegMoon className='text-gray-600 2xl:text-3xl' />
                        </button>
                        <button onClick={handleLogout} className='p-1 rounded-full hover:bg-red-50 transition group'>
                            <MdLogout className="text-xl 2xl:text-3xl text-gray-600 group-hover:text-red-600 transition duration-200" />
                        </button>

                        {/* Mobil Menü Açma Butonu (Sadece mobilde görünür 'md:hidden') */}
                        <div className="-mr-2 flex md:hidden">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                type="button"
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none"
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
                <div className="md:hidden bg-white border-b border-gray-200">
                    <div className="space-y-1 px-4 pb-3 pt-2 sm:px-3">
                        <Link
                            href="/dashboard"
                            className={`block rounded-md px-3 py-2 text-base font-medium ${isActive('/dashboard') ? 'bg-green-50 text-green-700' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Dashboard
                        </Link>
                        <Link
                            href="/transactions"
                            className={`block rounded-md px-3 py-2 text-base font-medium ${isActive('/transactions') ? 'bg-green-50 text-green-700' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}`}
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