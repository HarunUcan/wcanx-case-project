'use client'
import Link from 'next/link';
import React from 'react'
import { MdLogout } from "react-icons/md";
import { FaRegMoon } from "react-icons/fa";
import { usePathname, useRouter } from 'next/navigation';
import { authService } from '@/services/auth.service';

function PanelNavbar() {
    const router = useRouter();
    const pathName = usePathname();

    const handleLogout = () => {
        authService.logout();
        router.push('/login');
    };

    const isActive = (path: string) => {
        return pathName.startsWith(path);
    };

    return (
        <header>
            <nav className="bg-white border-b border-gray-200 px-8 lg:px-30 py-4 ">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <a href="/" className="flex items-center">
                        <img src={`https://wcanx.co/logo.png`} alt="Your Company" className="mr-3 h-6 sm:h-9" />
                        <span className="self-center text-xl font-semibold whitespace-nowrap text-gray-800">WcanX</span>
                    </a>

                    <div className=''>
                        <ul className='flex gap-8 font-semibold text-gray-800'>
                            <li><Link href={"/dashboard"} className={isActive('/dashboard') ? 'text-gray-900 border-b-2 border-green-600 transition duration:300' : 'hover:text-gray-900'}>Dashboard</Link></li>
                            <li><Link href={"/transactions"} className={isActive('/transactions') ? 'text-gray-900 border-b-2 border-green-600 transition duration:300' : 'hover:text-gray-900'}>İşlemler</Link></li>
                        </ul>
                    </div>

                    <div className='flex justify-center items-center gap-2'>
                        <div className='flex justify-center items-center gap-1 mr-2'>
                            <div className='flex justify-center items-center w-8 h-8 rounded-full border-2 font-semibold border-orange-400 bg-gray-300'>A</div>
                            <div className='flex flex-col'>
                                <span className='text-xs'>Hoşgeldin</span>
                                <span className='text-xs font-semibold'>Ahmet Y.</span>
                            </div>
                        </div>
                        <button>
                            <FaRegMoon className='cursor-pointer' />
                        </button>
                        <button onClick={handleLogout}>
                            <MdLogout className="text-xl hover:text-red-600 transition duration-200 cursor-pointer" />
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default PanelNavbar