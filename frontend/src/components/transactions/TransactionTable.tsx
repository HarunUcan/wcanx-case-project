import React, { useState } from 'react';
import { Transaction } from '@/types/types'; // Tipleri buradan çekiyoruz
import { LuPencil, LuTrash2, LuFileText, LuX } from "react-icons/lu";
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
    // Hangi notun görüntüleneceğini tutan state (string varsa modal açık demektir)
    const [viewingNote, setViewingNote] = useState<string | null>(null);

    return (
        <>
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
                        {transactions.map((item) => {
                            // Gelir mi Gider mi kontrolünü değişkene atayalım
                            const isIncome = item.type === 'Gelir';

                            return (
                                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">

                                    {/* Tür Sütunu */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`w-10 h-10 rounded-full flex items-center justify-center ${isIncome
                                                    ? 'bg-emerald-100 text-emerald-600'
                                                    : 'bg-red-100 text-red-500'
                                                    }`}
                                            >
                                                {isIncome ? (
                                                    <IoIosTrendingUp size={20} />
                                                ) : (
                                                    <IoIosTrendingDown size={20} />
                                                )}
                                            </div>
                                            <span className="font-semibold text-gray-700">
                                                {item.type}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Kategori */}
                                    <td className="px-6 py-4 font-bold text-gray-800 text-sm">
                                        {item.category}
                                    </td>

                                    {/* Tarih */}
                                    <td className="px-6 py-4 text-gray-500 text-sm">{item.date}</td>

                                    {/* Tutar */}
                                    <td className={`px-6 py-4 text-right font-bold ${isIncome ? 'text-emerald-600' : 'text-gray-900'
                                        }`}>
                                        {isIncome ? '+' : ''}
                                        {item.amount.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺
                                    </td>

                                    {/* Aksiyonlar */}
                                    <td className="px-6 py-4">
                                        <div className="flex justify-center text-gray-400">

                                            {/* NOT BUTONU: Sadece not doluysa görünür */}
                                            {item.note && item.note.trim().length > 0 ? (
                                                <button
                                                    onClick={() => setViewingNote(item.note!)}
                                                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-emerald-50 hover:text-emerald-600 cursor-pointer transition-colors"
                                                    title="Notu Göster"
                                                >
                                                    <LuFileText size={18} />
                                                </button>
                                            ) : (
                                                // Hizalamayı korumak için boş div
                                                <div className="w-8 h-8" />
                                            )}

                                            <button
                                                onClick={() => onEdit?.(item.id)}
                                                disabled={!onEdit}
                                                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors"
                                                title="Düzenle"
                                            >
                                                <LuPencil size={18} />
                                            </button>

                                            <button
                                                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-50 hover:text-red-600 cursor-pointer transition-colors"
                                                type="button"
                                                onClick={() => onDelete?.(item.id)}
                                                disabled={!onDelete}
                                                title="Sil"
                                            >
                                                <LuTrash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Modal sadece viewingNote doluysa render olur */}
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