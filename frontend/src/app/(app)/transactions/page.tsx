'use client'

import { Protected } from '@/components/layout/Protected'
import AddTransactionModal from '@/components/transactions/AddTransactionModal';
import FilterBar from '@/components/transactions/FilterBar';
import TransactionTable from '@/components/transactions/TransactionTable';
import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa6';


function TransactionsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <Protected>
            <div className="px-30">
                <div className="flex justify-between mt-8">
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold text-gray-800">İşlemler</span>
                        <span className="text-gray-600">Finansal hareketlerini detaylı olarak incele ve yönet</span>
                    </div>

                    <button onClick={() => setIsModalOpen(true)} className="font-semibold rounded-full px-6 bg-green-400 cursor-pointer h-12">
                        <span className="flex justify-center items-center gap-1">
                            <FaPlus />
                            <span>Yeni İşlem Ekle</span>
                        </span>
                    </button>
                </div>

                <div className='mt-12'>
                    <FilterBar />
                </div>

                <div className='mt-4 mb-20'>
                    <TransactionTable
                        transactions={[
                            { id: 1, type: 'Gelir', category: 'Maaş', date: '15 Ekim 2023', amount: 45000 },
                            { id: 2, type: 'Gider', category: 'Kira', date: '15 Ekim 2023', amount: -15000 },
                            { id: 3, type: 'Gelir', category: 'Freelance', date: '12 Ekim 2023', amount: 12500 },
                            { id: 4, type: 'Gider', category: 'Yiyecek', date: '10 Ekim 2023', amount: -6200 },
                        ]}
                    />
                </div>

                <AddTransactionModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSave={(data) => {
                        console.log("Kaydedilen Veri:", data);
                        // Burada veriyi API'ye gönderebilirsiniz.
                    }}
                />
            </div>
        </Protected>
    )
}

export default TransactionsPage