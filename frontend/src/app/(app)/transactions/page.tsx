'use client';

import { Protected } from '@/components/layout/Protected';
import AddTransactionModal from '@/components/transactions/AddTransactionModal';
import FilterBar from '@/components/transactions/FilterBar';
import TransactionTable from '@/components/transactions/TransactionTable';
import React, { useEffect, useMemo, useState } from 'react';
import { FaPlus } from 'react-icons/fa6';

import { transactionsService, TransactionDto } from '@/services/transactions.service';
import type { Transaction } from '@/types/types';
import ConfirmModal from '@/components/ui/ConfirmModal';

function formatDateTR(iso: string) {
    const d = new Date(iso);
    return d.toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' });
}

function TransactionsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [raw, setRaw] = useState<TransactionDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

    const loadTransactions = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await transactionsService.list();
            setRaw(data);
        } catch (e: any) {
            setError(e?.response?.data?.message ?? 'İşlemler alınamadı.');
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (data: {
        type: 'income' | 'expense';
        category: string;
        amount: number;
        date: string;
        note?: string;
    }) => {
        setError(null);
        try {
            await transactionsService.create(data);
            await loadTransactions(); // tabloyu yenile
        } catch (e: any) {
            setError(e?.response?.data?.message ?? 'İşlem eklenemedi.');
        }
    };


    useEffect(() => {
        loadTransactions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const tableTransactions: Transaction[] = useMemo(() => {
        return raw.map((t) => {
            const type: Transaction['type'] = t.type === 'income' ? 'Gelir' : 'Gider';
            const amount = t.type === 'expense' ? -Math.abs(t.amount) : Math.abs(t.amount);

            return {
                id: t._id,
                type,
                category: t.category,
                date: formatDateTR(t.date),
                amount,
            };
        });
    }, [raw]);

    //  Silme işlemi
    const requestDelete = (id: string) => {
        setPendingDeleteId(id);
        setConfirmOpen(true);
    };

    const confirmDelete = async () => {
        if (!pendingDeleteId) return;

        setConfirmOpen(false);
        setError(null);

        const prev = raw;
        setRaw((curr) => curr.filter((x) => x._id !== pendingDeleteId));

        try {
            await transactionsService.remove(pendingDeleteId);
        } catch (e: any) {
            setRaw(prev);
            setError(e?.response?.data?.message ?? 'Silme işlemi başarısız.');
        } finally {
            setPendingDeleteId(null);
        }
    };


    return (
        <Protected>
            <div className="px-30">
                <div className="flex justify-between mt-8">
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold text-gray-800">İşlemler</span>
                        <span className="text-gray-600">Finansal hareketlerini detaylı olarak incele ve yönet</span>
                    </div>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="font-semibold rounded-full px-6 bg-green-400 cursor-pointer h-12"
                    >
                        <span className="flex justify-center items-center gap-1">
                            <FaPlus />
                            <span>Yeni İşlem Ekle</span>
                        </span>
                    </button>
                </div>

                <div className="mt-12">
                    <FilterBar />
                </div>

                {error && (
                    <div className="mt-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {error}
                    </div>
                )}

                <div className="mt-4 mb-20">
                    <TransactionTable transactions={tableTransactions} onDelete={requestDelete} />
                </div>

                <AddTransactionModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleCreate}
                />

            </div>

            <ConfirmModal
                isOpen={confirmOpen}
                title="İşlemi Sil"
                description="Bu işlemi silmek üzeresiniz. Bu işlem geri alınamaz."
                confirmText="Evet, Sil"
                cancelText="Vazgeç"
                onCancel={() => {
                    setConfirmOpen(false);
                    setPendingDeleteId(null);
                }}
                onConfirm={confirmDelete}
            />

        </Protected>
    );
}

export default TransactionsPage;
