import React from 'react'

function CreditCard() {
    return (
        <div className='flex flex-col w-4/5 rounded-2xl bg-emerald-950 p-8 2xl:py-16 2xl:py-12 text-white mt-10 2xl:my-25 shadow-2xl shadow-black-900/75 border border-emerald-900 rotate-3'>
            <div className='flex justify-between'>
                <p className='text-emerald-300 2xl:text-3xl'>Toplam Bakiye</p>
                <img src={`https://wcanx.co/logo.png`} alt="Your Company" className="h-7 2xl:h-16 w-auto" />

            </div>
            <p className='font-semibold text-2xl 2xl:text-4xl'>₺24.500,00</p>
            <div className='flex justify-between text-sm 2xl:text-2xl 2xl:mt-4'>
                <p className=''>Aylık Limit</p>
                <p className=''>%75</p>
            </div>
            <div className='flex'>
                <hr className="w-2/3 h-1 2xl:h-2 mt-1 bg-green-600 border-0 rounded-sm "></hr>
                <hr className="w-1/3 h-1 2xl:h-2 mt-1 bg-gray-600 border-0 rounded-sm "></hr>

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