import React from 'react'
import CreditCard from './CreditCard'

function RegisterLeftArea() {
    return (
        <div className='hidden flex flex-col items-between w-1/2 bg-green-950 2xl:h-[1200px] lg:block lg:flex'>
            <div className='mt-12  2xl:mt-30 pl-12'>
                <p className='text-white font-semibold text-4xl/9 2xl:text-6xl space-y-4'>Geleceğinizi</p>
                <p className='text-green-500 font-semibold text-4xl/9 2xl:text-4xl/9 space-y-4'>güvence altına alın.</p>
                <p className='text-gray-400 w-2/3 font-semibold text-sm 2xl:text-2xl space-y-4 mt-3'>Harcamalarınızı takip edin, bütçenizi yönetin ve finansal hedeflerinize daha hızlı ulaşın.</p>

                <CreditCard />
            </div>
        </div>
    )
}

export default RegisterLeftArea