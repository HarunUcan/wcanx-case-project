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
            <div className="hidden md:block w-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        {/* 2xl:text-sm -> Başlıklar büyük ekranda biraz büyür */}
                        <tr className="bg-gray-50/50 text-[11px] 2xl:text-sm uppercase tracking-wider text-gray-400 font-bold">
                            <th className="px-6 py-4 2xl:py-5">Tür</th>
                            <th className="px-6 py-4 2xl:py-5">Kategori</th>
                            <th className="px-6 py-4 2xl:py-5">Tarih</th>
                            <th className="px-6 py-4 2xl:py-5 text-right">Tutar</th>
                            <th className="px-6 py-4 2xl:py-5 text-right">Aksiyonlar</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {transactions.map((item) => {
                            const isIncome = item.type === 'Gelir';
                            return (
                                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">

                                    {/* TÜR KOLONU */}
                                    <td className="px-6 py-4 2xl:py-6">
                                        <div className="flex items-center gap-3 2xl:gap-4">
                                            <div className={`w-10 h-10 2xl:w-14 2xl:h-14 rounded-full flex items-center justify-center ${isIncome ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-500'}`}>
                                                {/* İkonlar responsive class ile yönetiliyor */}
                                                {isIncome
                                                    ? <IoIosTrendingUp className="w-5 h-5 2xl:w-7 2xl:h-7" />
                                                    : <IoIosTrendingDown className="w-5 h-5 2xl:w-7 2xl:h-7" />
                                                }
                                            </div>
                                            <span className="font-semibold text-gray-700 2xl:text-lg">{item.type}</span>
                                        </div>
                                    </td>

                                    {/* KATEGORİ KOLONU */}
                                    <td className="px-6 py-4 2xl:py-6 font-bold text-gray-800 text-sm 2xl:text-lg">
                                        {item.category}
                                    </td>

                                    {/* TARİH KOLONU */}
                                    <td className="px-6 py-4 2xl:py-6 text-gray-500 text-sm 2xl:text-lg">
                                        {item.date}
                                    </td>

                                    {/* TUTAR KOLONU */}
                                    <td className={`px-6 py-4 2xl:py-6 text-right font-bold 2xl:text-xl ${isIncome ? 'text-emerald-600' : 'text-gray-900'}`}>
                                        {isIncome ? '+' : ''}{item.amount.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺
                                    </td>

                                    {/* AKSİYONLAR KOLONU */}
                                    <td className="px-6 py-4 2xl:py-6">
                                        <div className="flex justify-end text-gray-400 gap-1 2xl:gap-2">

                                            {/* Buton Boyutları: w-8 -> 2xl:w-12 */}
                                            {item.note && item.note.trim().length > 0 && (
                                                <button onClick={() => setViewingNote(item.note!)} className="w-8 h-8 2xl:w-12 2xl:h-12 flex items-center justify-center rounded-full hover:bg-emerald-50 hover:text-emerald-600 transition-colors cursor-pointer">
                                                    <LuFileText className="w-[18px] h-[18px] 2xl:w-6 2xl:h-6" />
                                                </button>
                                            )}

                                            <button onClick={() => onEdit?.(item.id)} disabled={!onEdit} className="w-8 h-8 2xl:w-12 2xl:h-12 flex items-center justify-center rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer">
                                                <LuPencil className="w-[18px] h-[18px] 2xl:w-6 2xl:h-6" />
                                            </button>

                                            <button onClick={() => onDelete?.(item.id)} disabled={!onDelete} className="w-8 h-8 2xl:w-12 2xl:h-12 flex items-center justify-center rounded-full hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer">
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
                        <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-3">
                            <div className="flex justify-between items-start">
                                <div className="flex gap-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${isIncome ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-500'}`}>
                                        {isIncome ? <IoIosTrendingUp size={20} /> : <IoIosTrendingDown size={20} />}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-gray-800 text-sm">{item.category}</span>
                                        <span className="text-xs text-gray-500">{item.date}</span>
                                    </div>
                                </div>
                                <span className={`font-bold text-sm ${isIncome ? 'text-emerald-600' : 'text-gray-900'}`}>
                                    {isIncome ? '+' : ''}{item.amount.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺
                                </span>
                            </div>
                            <div className="pt-3 border-t border-gray-50 flex justify-end gap-2">
                                {item.note && item.note.trim().length > 0 && (
                                    <button
                                        onClick={() => setViewingNote(item.note!)}
                                        className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors text-xs flex items-center gap-1"
                                    >
                                        <LuFileText size={16} />
                                        <span>Not</span>
                                    </button>
                                )}
                                <button
                                    onClick={() => onEdit?.(item.id)}
                                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-xs flex items-center gap-1"
                                >
                                    <LuPencil size={16} />
                                    <span>Düzenle</span>
                                </button>
                                <button
                                    onClick={() => onDelete?.(item.id)}
                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors text-xs flex items-center gap-1"
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