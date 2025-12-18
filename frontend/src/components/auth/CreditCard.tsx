import React from 'react'

function CreditCard() {
    return (
        <div className='flex flex-col w-4/5 rounded-2xl bg-emerald-950 p-8 text-white mt-10 shadow-2xl shadow-black-900/75 border border-emerald-900 rotate-3'>
            <div className='flex justify-between'>
                <p className='text-emerald-300'>Toplam Bakiye</p>
                <img src={`https://wcanx.co/logo.png`} alt="Your Company" className="h-7 w-auto" />

            </div>
            <p className='font-semibold text-2xl'>₺24.500,00</p>
            <div className='flex justify-between text-sm'>
                <p className=''>Aylık Limit</p>
                <p className=''>%75</p>
            </div>
            <div className='flex'>
                <hr className="w-75 h-1 mt-1 bg-green-600 border-0 rounded-sm "></hr>
                <hr className="w-25 h-1 mt-1 bg-gray-600 border-0 rounded-sm "></hr>

            </div>

            <div className='flex gap-2 mt-4'>
                <div className='w-8 h-8 bg-gray-800 rounded-full'></div>
                <div className='w-8 h-8 bg-gray-800 rounded-full'></div>
                <div className='w-8 h-8 bg-gray-800 rounded-full'></div>
            </div>
        </div>
    )
}

export default CreditCard