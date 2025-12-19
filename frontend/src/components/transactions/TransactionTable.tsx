import { Transaction } from '@/types/types';
import React from 'react';
import { LuPencil, LuTrash2 } from "react-icons/lu";
import { IoIosTrendingDown, IoIosTrendingUp } from "react-icons/io";

// const transactions: Transaction[] = [
//     { id: 1, type: 'Gelir', category: 'Maaş', date: '15 Ekim 2023', amount: 45000 },
//     { id: 2, type: 'Gider', category: 'Kira', date: '15 Ekim 2023', amount: -15000 },
//     { id: 3, type: 'Gelir', category: 'Freelance', date: '12 Ekim 2023', amount: 12500 },
//     { id: 4, type: 'Gider', category: 'Yiyecek', date: '10 Ekim 2023', amount: -6200 },
// ];

function TransactionTable({ transactions }: { transactions: Transaction[] }) {
    return (
        <div className="w-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-50/50 text-[11px] uppercase tracking-wider text-gray-400 font-bold">
                        <th className="px-6 py-4">Tür</th>
                        <th className="px-6 py-4">Kategori</th>
                        <th className="px-6 py-4">Tarih</th>
                        <th className="px-6 py-4 text-right">Tutar</th>
                        <th className="px-6 py-4 text-center">Aksiyonlar</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {transactions.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                            {/* Tür Sütunu */}
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.type === 'Gelir' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'
                                        }`}>
                                        {item.type === 'Gelir' ? <IoIosTrendingUp size={20} /> : <IoIosTrendingDown size={20} />}
                                    </div>
                                    <span className="font-semibold text-gray-700">{item.type}</span>
                                </div>
                            </td>

                            {/* Kategori */}
                            <td className="px-6 py-4 font-bold text-gray-800 text-sm">
                                {item.category}
                            </td>

                            {/* Tarih */}
                            <td className="px-6 py-4 text-gray-500 text-sm">
                                {item.date}
                            </td>

                            {/* Tutar */}
                            <td className={`px-6 py-4 text-right font-bold ${item.type === 'Gelir' ? 'text-green-600' : 'text-gray-900'
                                }`}>
                                {item.amount > 0 ? `+${item.amount.toLocaleString('tr-TR')}` : item.amount.toLocaleString('tr-TR')} ₺
                            </td>

                            {/* Aksiyonlar */}
                            <td className="px-6 py-4">
                                <div className="flex justify-center gap-3 text-gray-400">
                                    <button className="hover:text-blue-600 cursor-pointer transition-colors">
                                        <LuPencil size={18} />
                                    </button>
                                    <button className="hover:text-red-600 cursor-pointer transition-colors">
                                        <LuTrash2 size={18} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionTable;