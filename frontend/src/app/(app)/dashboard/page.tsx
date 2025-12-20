'use client';

import { Protected } from '@/components/layout/Protected';
import MonthPicker from '@/components/ui/MonthPicker';
import { FaPlus } from 'react-icons/fa6';

import InfoCard, { CardType } from '@/components/dashboard/InfoCard';
import { ExpenseDistributionCard } from '@/components/dashboard/ExpenseDistributionCard';
import { MonthlyIncomeExpenseCard } from '@/components/dashboard/MonthlyIncomeExpenseCard';

import React, { useEffect, useMemo, useState } from 'react';
import { dashboardService } from '@/services/dashboard.service';
import AddTransactionModal from '@/components/transactions/AddTransactionModal';
import { transactionsService } from '@/services/transactions.service';

const CATEGORY_COLORS = [
    '#2fd37a',
    '#3b82f6',
    '#f59e0b',
    '#ec4899',
    '#64748b',
    '#22c55e',
    '#ef4444',
];

function toYYYYMM(d: Date) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    return `${y}-${m}`;
}

function formatMonthNameTR(yyyyMm: string) {
    const [y, m] = yyyyMm.split('-').map(Number);
    const date = new Date(y, (m ?? 1) - 1, 1);
    return date.toLocaleDateString('tr-TR', { month: 'long' });
}

export default function DashboardPage() {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    const [summary, setSummary] = useState<{
        totalIncome: number;
        totalExpense: number;
        balance: number;
    } | null>(null);

    // Yıllık seri
    const [incomeExpenseRows, setIncomeExpenseRows] = useState<
        Array<{ month: string; income: number; expense: number }>
    >([]);

    // ExpenseDistributionCard -> DonutItem[] bekliyor (color zorunlu)
    const [expenseByCategory, setExpenseByCategory] = useState<
        Array<{ name: string; value: number; color: string }>
    >([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const selectedMonth = useMemo(() => toYYYYMM(selectedDate), [selectedDate]);
    const selectedYear = useMemo(() => selectedDate.getFullYear(), [selectedDate]);

    // UI: "Seçili ayın karşılaştırması" -> summary'den tek bar üret
    const chartData = useMemo(() => {
        const monthName = formatMonthNameTR(selectedMonth);
        return [
            {
                name: monthName.charAt(0).toUpperCase() + monthName.slice(1),
                income: summary?.totalIncome ?? 0,
                expense: summary?.totalExpense ?? 0,
            },
        ];
    }, [selectedMonth, summary]);

    const yearlyChartData = useMemo(() => {
        // Gelen veriyi hızlı lookup için map'e çevir
        const byMonth = new Map<string, { income: number; expense: number }>();
        for (const r of incomeExpenseRows) {
            byMonth.set(r.month, { income: r.income ?? 0, expense: r.expense ?? 0 });
        }

        // Seçili yılın 12 ayını üret (YYYY-01 ... YYYY-12)
        const months = Array.from({ length: 12 }, (_, i) => {
            const mm = String(i + 1).padStart(2, '0');
            return `${selectedYear}-${mm}`;
        });

        // Her ay için veri varsa kullan, yoksa 0 bas
        return months.map((yyyyMm) => {
            const monthName = formatMonthNameTR(yyyyMm);
            const found = byMonth.get(yyyyMm);

            return {
                name: monthName.charAt(0).toUpperCase() + monthName.slice(1),
                income: found?.income ?? 0,
                expense: found?.expense ?? 0,
            };
        });
    }, [incomeExpenseRows, selectedYear]);

    useEffect(() => {
        let cancelled = false;

        async function load() {
            setLoading(true);
            setError(null);

            try {
                const [s, yearly, byCat] = await Promise.all([
                    dashboardService.getSummary(selectedMonth),
                    dashboardService.getIncomeExpense(selectedYear),
                    dashboardService.getExpenseByCategory(selectedMonth),
                ]);

                if (cancelled) return;

                setSummary({
                    totalIncome: s.totalIncome,
                    totalExpense: s.totalExpense,
                    balance: s.balance,
                });

                setIncomeExpenseRows(yearly);

                // color zorunlu: frontend'te garanti ediyoruz
                setExpenseByCategory(
                    byCat.map((x, index) => ({
                        name: x.category,
                        value: x.amount,
                        color: CATEGORY_COLORS[index % CATEGORY_COLORS.length],
                    })),
                );
            } catch (e: any) {
                if (cancelled) return;
                setError(e?.response?.data?.message ?? 'Dashboard verileri alınamadı.');
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        load();
        return () => {
            cancelled = true;
        };
    }, [selectedMonth, selectedYear]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    // Dashboard'dan işlem ekleme: POST + dashboard refresh
    const handleCreateTransaction = async (data: {
        type: 'expense' | 'income';
        amount: number;
        category: string;
        date: string;
        note?: string;
    }) => {
        setError(null);
        try {
            await transactionsService.create(data);

            // ekleme başarılı -> modal kapat
            setIsModalOpen(false);

            // verileri yenilemek için aynı load mantığını tekrar çalıştır:
            // burada useEffect içindeki load'u kopyalamadan, kısa yoldan aynı 3 isteği tekrar atıyoruz
            const [s, yearly, byCat] = await Promise.all([
                dashboardService.getSummary(selectedMonth),
                dashboardService.getIncomeExpense(selectedYear),
                dashboardService.getExpenseByCategory(selectedMonth),
            ]);

            setSummary({
                totalIncome: s.totalIncome,
                totalExpense: s.totalExpense,
                balance: s.balance,
            });

            setIncomeExpenseRows(yearly);

            setExpenseByCategory(
                byCat.map((x, index) => ({
                    name: x.category,
                    value: x.amount,
                    color: CATEGORY_COLORS[index % CATEGORY_COLORS.length],
                })),
            );
        } catch (e: any) {
            setError(e?.response?.data?.message ?? 'İşlem eklenemedi.');
        }
    };

    return (
        <Protected>
            <div className="px-30">
                {/* Üst Bilgi Alanı*/}
                <div className="flex justify-between mt-8">
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold text-gray-800">Finansal Durum</span>
                        <span className="text-gray-600">Bu ayki harcamalarının özeti</span>
                    </div>

                    <MonthPicker initialDate={selectedDate} onChange={(d) => setSelectedDate(d)} />

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="font-semibold rounded-full px-6 bg-green-400 cursor-pointer h-12 shadow-md"
                    >
                        <span className="flex justify-center items-center gap-1">
                            <FaPlus />
                            <span>Yeni İşlem Ekle</span>
                        </span>
                    </button>
                </div>

                <AddTransactionModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSave={(data) => {
                        handleCreateTransaction(data);
                    }}
                />

                {error && (
                    <div className="mt-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {error}
                    </div>
                )}

                {/* Finansal Bilgi Kartları*/}
                <div className="flex justify-center items-center gap-8 mt-12">
                    <InfoCard title="Toplam Gelir" amount={summary?.totalIncome ?? 0} percentage="" cardType={CardType.INCOME} />
                    <InfoCard title="Toplam Gider" amount={summary?.totalExpense ?? 0} percentage="" cardType={CardType.EXPEND} />
                    <InfoCard title="Net Bakiye" amount={summary?.balance ?? 0} percentage="" cardType={CardType.TOTAL} />
                </div>

                {/* Grafik Kartları */}
                <div className="flex justify-center items-center gap-8 mt-12 mb-16">
                    <MonthlyIncomeExpenseCard
                        title="Yıllık Gelir vs Gider"
                        subtitle="Seçili yılın karşılaştırması"
                        chartData={yearlyChartData}
                        chartHeight={300}
                    />

                    <ExpenseDistributionCard title="Gider Dağılımı" subtitle="Kategorilere göre" data={expenseByCategory} />
                </div>
            </div>
        </Protected>
    );
}
