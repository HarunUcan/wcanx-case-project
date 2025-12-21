import React, { useState } from 'react';
import { Transaction } from '@/types/types';
import { LuPencil, LuTrash2, LuFileText } from "react-icons/lu";
import { IoIosTrendingDown, IoIosTrendingUp } from "react-icons/io";
import NoteModal from '../ui/NoteModal';

function TransactionTable({
    transactions,
    onDelete,
    onEdit,
}: {
    transactions: Transaction[];
    onDelete?: (id: string) => void;
    onEdit?: (id: string) => void;
}) {
    const [viewingNote, setViewingNote] = useState<string | null>(null);

    return (
        <>
            {/* MASAÜSTÜ GÖRÜNÜMÜ (TABLE) - md:block (Tablet ve üstü) */}
            <div className="hidden md:block w-full overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-xl dark:shadow-gray-700/40 transition-colors duration-300">
                <table className="w-full text-left border-collapse">
                    <thead>
                        {/* 2xl:text-sm -> Başlıklar büyük ekranda biraz büyür */}
                        <tr className="bg-gray-50/50 dark:bg-gray-700/50 text-[11px] 2xl:text-sm uppercase tracking-wider text-gray-400 dark:text-gray-500 font-bold">
                            <th className="px-6 py-4 2xl:py-5">Tür</th>
                            <th className="px-6 py-4 2xl:py-5">Kategori</th>
                            <th className="px-6 py-4 2xl:py-5">Tarih</th>
                            <th className="px-6 py-4 2xl:py-5 text-right">Tutar</th>
                            <th className="px-6 py-4 2xl:py-5 text-right">Aksiyonlar</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                        {transactions.map((item) => {
                            const isIncome = item.type === 'Gelir';
                            return (
                                <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors group">

                                    {/* TÜR KOLONU */}
                                    <td className="px-6 py-4 2xl:py-6">
                                        <div className="flex items-center gap-3 2xl:gap-4">
                                            <div className={`w-10 h-10 2xl:w-14 2xl:h-14 rounded-full flex items-center justify-center ${isIncome ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' : 'bg-red-100 dark:bg-red-900/30 text-red-500 dark:text-red-400'}`}>
                                                {/* İkonlar responsive class ile yönetiliyor */}
                                                {isIncome
                                                    ? <IoIosTrendingUp className="w-5 h-5 2xl:w-7 2xl:h-7" />
                                                    : <IoIosTrendingDown className="w-5 h-5 2xl:w-7 2xl:h-7" />
                                                }
                                            </div>
                                            <span className="font-semibold text-gray-700 dark:text-gray-200 2xl:text-lg">{item.type}</span>
                                        </div>
                                    </td>

                                    {/* KATEGORİ KOLONU */}
                                    <td className="px-6 py-4 2xl:py-6 font-bold text-gray-800 dark:text-white text-sm 2xl:text-lg">
                                        {item.category}
                                    </td>

                                    {/* TARİH KOLONU */}
                                    <td className="px-6 py-4 2xl:py-6 text-gray-500 dark:text-gray-400 text-sm 2xl:text-lg">
                                        {item.date}
                                    </td>

                                    {/* TUTAR KOLONU */}
                                    <td className={`px-6 py-4 2xl:py-6 text-right font-bold 2xl:text-xl ${isIncome ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-900 dark:text-white'}`}>
                                        {isIncome ? '+' : ''}{item.amount.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺
                                    </td>

                                    {/* AKSİYONLAR KOLONU */}
                                    <td className="px-6 py-4 2xl:py-6">
                                        <div className="flex justify-end text-gray-400 dark:text-gray-500 gap-1 2xl:gap-2">

                                            {/* Buton Boyutları: w-8 -> 2xl:w-12 */}
                                            {item.note && item.note.trim().length > 0 && (
                                                <button onClick={() => setViewingNote(item.note!)} className="w-8 h-8 2xl:w-12 2xl:h-12 flex items-center justify-center rounded-full hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer">
                                                    <LuFileText className="w-[18px] h-[18px] 2xl:w-6 2xl:h-6" />
                                                </button>
                                            )}

                                            <button onClick={() => onEdit?.(item.id)} disabled={!onEdit} className="w-8 h-8 2xl:w-12 2xl:h-12 flex items-center justify-center rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                                                <LuPencil className="w-[18px] h-[18px] 2xl:w-6 2xl:h-6" />
                                            </button>

                                            <button onClick={() => onDelete?.(item.id)} disabled={!onDelete} className="w-8 h-8 2xl:w-12 2xl:h-12 flex items-center justify-center rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-colors cursor-pointer">
                                                <LuTrash2 className="w-[18px] h-[18px] 2xl:w-6 2xl:h-6" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* ============================================== */}
            {/* MOBİL GÖRÜNÜM (CARDS) - Değişiklik Yok */}
            {/* ============================================== */}
            <div className="md:hidden space-y-4">
                {transactions.map((item) => {
                    const isIncome = item.type === 'Gelir';
                    return (
                        <div key={item.id} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col gap-3 transition-colors duration-300">
                            <div className="flex justify-between items-start">
                                <div className="flex gap-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${isIncome ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' : 'bg-red-100 dark:bg-red-900/30 text-red-500 dark:text-red-400'}`}>
                                        {isIncome ? <IoIosTrendingUp size={20} /> : <IoIosTrendingDown size={20} />}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-gray-800 dark:text-white text-sm">{item.category}</span>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">{item.date}</span>
                                    </div>
                                </div>
                                <span className={`font-bold text-sm ${isIncome ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-900 dark:text-white'}`}>
                                    {isIncome ? '+' : ''}{item.amount.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺
                                </span>
                            </div>
                            <div className="pt-3 border-t border-gray-50 dark:border-gray-700 flex justify-end gap-2">
                                {item.note && item.note.trim().length > 0 && (
                                    <button
                                        onClick={() => setViewingNote(item.note!)}
                                        className="p-2 text-gray-400 dark:text-gray-500 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors text-xs flex items-center gap-1"
                                    >
                                        <LuFileText size={16} />
                                        <span>Not</span>
                                    </button>
                                )}
                                <button
                                    onClick={() => onEdit?.(item.id)}
                                    className="p-2 text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors text-xs flex items-center gap-1"
                                >
                                    <LuPencil size={16} />
                                    <span>Düzenle</span>
                                </button>
                                <button
                                    onClick={() => onDelete?.(item.id)}
                                    className="p-2 text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-xs flex items-center gap-1"
                                >
                                    <LuTrash2 size={16} />
                                    <span>Sil</span>
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {viewingNote && (
                <NoteModal
                    note={viewingNote}
                    onClose={() => setViewingNote(null)}
                />
            )}
        </>
    );
}

export default TransactionTable;