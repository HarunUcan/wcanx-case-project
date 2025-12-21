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
import EditTransactionModal, { EditInitialData } from '@/components/transactions/EditTransactionModal';

function formatDateTR(iso: string) {
    const d = new Date(iso);
    return d.toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' });
}

function getCurrentMonth(): string {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    return `${y}-${m}`; // YYYY-MM
}

function TransactionsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [raw, setRaw] = useState<TransactionDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editing, setEditing] = useState<EditInitialData | null>(null);


    const loadTransactions = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await transactionsService.list(filters.month ?? undefined);
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

    const handleEditOpen = (id: string) => {
        const t = raw.find((x) => x._id === id);
        if (!t) return;

        setEditing({
            id: t._id,
            type: t.type,          // 'income' | 'expense' (DTO ile uyumlu)
            amount: t.amount,
            category: t.category,
            date: t.date.slice(0, 10), // ISO -> YYYY-MM-DD
            note: t.note,
        });

        setIsEditOpen(true);
    };

    const handleEditSave = async (id: string, data: { type: 'income' | 'expense'; amount: number; category: string; date: string; note?: string }) => {
        setError(null);
        try {
            await transactionsService.update(id, data);
            await loadTransactions();
        } catch (e: any) {
            setError(e?.response?.data?.message ?? 'Güncelleme başarısız.');
        }
    };


    type TransactionFilterType = 'all' | 'income' | 'expense';

    const [filters, setFilters] = useState<{
        month: string | null;      // YYYY-MM
        type: TransactionFilterType;
        category: string | null;
        search: string;
    }>({
        month: getCurrentMonth(),
        type: 'all',
        category: null,
        search: '',
    });

    const categories = useMemo(() => {
        const set = new Set<string>();

        raw.forEach((t) => {
            if (t.category) set.add(t.category);
        });

        return ['Tümü', ...Array.from(set).sort()];
    }, [raw]);



    useEffect(() => {
        loadTransactions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters.month]);

    const tableTransactions: Transaction[] = useMemo(() => {
        return raw.map((t) => {
            const type: Transaction['type'] = t.type === 'income' ? 'Gelir' : 'Gider';
            const amount = t.type === 'expense' ? -Math.abs(t.amount) : Math.abs(t.amount);

            return {
                id: t._id,
                type,
                category: t.category,
                note: t.note,
                date: formatDateTR(t.date),      // UI
                isoDate: t.date,                // filtreleme için ham ISO
                amount,
            };
        });
    }, [raw]);


    const filteredTransactions = useMemo(() => {
        return tableTransactions.filter((t) => {
            // Tür
            if (filters.type !== 'all') {
                if (filters.type === 'income' && t.type !== 'Gelir') return false;
                if (filters.type === 'expense' && t.type !== 'Gider') return false;
            }

            // Kategori
            if (filters.category && t.category !== filters.category) {
                return false;
            }

            // Arama
            if (
                filters.search &&
                !(
                    t.category.toLowerCase().includes(filters.search.toLowerCase()) ||
                    (t.note ?? '').toLowerCase().includes(filters.search.toLowerCase())
                )
            ) {
                return false;
            }

            // Tarih (YYYY-MM)
            if (filters.month) {
                const month = t.isoDate.slice(0, 7);
                if (month !== filters.month) return false;
            }

            return true;
        });
    }, [tableTransactions, filters]);


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
            <div className="px-4 md:px-8 lg:px-30">
                <div className="flex flex-col lg:flex-row justify-center items-center gap-4 lg:gap-0 lg:justify-between mt-8 2xl:mt-12">
                    <div className="flex flex-col items-center lg:items-start">
                        <span className="text-center text-2xl 2xl:text-4xl font-bold text-gray-800 dark:text-white">İşlemler</span>
                        <span className="text-center text-gray-600 dark:text-gray-400 2xl:text-2xl">Finansal hareketlerini detaylı olarak incele ve yönet</span>
                    </div>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="font-semibold rounded-full px-6 bg-green-400 text-gray-900 cursor-pointer 2xl:w-70 h-12 2xl:h-16 shadow-md"
                    >
                        <span className="flex justify-center 2xl:text-2xl items-center gap-1">
                            <FaPlus />
                            <span>Yeni İşlem Ekle</span>
                        </span>
                    </button>
                </div>

                <div className="mt-12">
                    <FilterBar
                        filters={filters}
                        categories={categories}
                        onChange={setFilters}
                    />
                </div>

                {error && (
                    <div className="mt-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {error}
                    </div>
                )}

                <div className="mt-4 mb-20">
                    <TransactionTable
                        transactions={filteredTransactions}
                        onDelete={requestDelete}
                        onEdit={handleEditOpen}
                    />
                </div>

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

            <AddTransactionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleCreate}
            />

            <EditTransactionModal
                isOpen={isEditOpen}
                onClose={() => {
                    setIsEditOpen(false);
                    setEditing(null);
                }}
                initialData={editing}
                onSave={handleEditSave}
            />

        </Protected>
    );
}

export default TransactionsPage;
