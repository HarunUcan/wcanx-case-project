'use client';

import React, { useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import SimpleBarChart from "@/components/charts/SimpleBarChart";
import type { BarChartData } from "@/types/types";

type MonthlyIncomeExpenseCardProps = {
    title: string;
    subtitle: string;
    chartData: BarChartData[];
    chartHeight?: number;
};

export function MonthlyIncomeExpenseCard({
    title,
    subtitle,
    chartData,
    chartHeight = 300,
}: MonthlyIncomeExpenseCardProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isGraphicView, setIsGraphicView] = useState(true);
    const totalIncome = chartData.reduce((sum, item) => sum + item.income, 0);
    const totalExpense = chartData.reduce((sum, item) => sum + item.expense, 0);
    const netBalance = totalIncome - totalExpense;

    return (
        <div className="flex flex-col bg-white dark:bg-gray-800 items-between h-100 2xl:h-150 gap-6 lg:w-1/2 shadow-xl dark:shadow-gray-700/40 border border-gray-200 dark:border-gray-700 rounded-[50px] py-8 transition-colors duration-300">
            <div className="flex justify-between items-start px-12">
                <div className="flex flex-col justify-center">
                    <span className="font-bold text-xl 2xl:text-3xl text-gray-800 dark:text-white">{title}</span>
                    <span className="text-sm 2xl:text-xl text-gray-600 dark:text-gray-400">{subtitle}</span>
                </div>

                <div className="relative">
                    <button
                        type="button"
                        onClick={() => setIsMenuOpen((v) => !v)}
                        className="flex justify-center items-center text-gray-800 dark:text-white text-2xl 2xl:text-4xl font-bold cursor-pointer"
                        aria-label="menu"
                    >
                        <HiDotsHorizontal />
                    </button>

                    {isMenuOpen && (
                        <div className="absolute right-0 mt-2 w-40 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg overflow-hidden z-20 ">
                            <button
                                type="button"
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                                onClick={() => {
                                    // örnek aksiyon
                                    setIsMenuOpen(false);
                                    console.log("Refresh clicked");
                                }}
                            >
                                Yenile
                            </button>
                            <button
                                type="button"
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                                onClick={() => {
                                    setIsMenuOpen(false);
                                    setIsGraphicView(!isGraphicView);
                                    console.log("Details clicked");
                                }}
                            >
                                {isGraphicView ? 'Yıllık Özet' : 'Grafik'}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {isGraphicView ? (
                <div className="flex justify-center items-center w-full h-full py-8 px-2 lg:px-12 lg:py-0">
                    <SimpleBarChart data={chartData} />
                </div>
            ) : (
                <div className="flex flex-col justify-center items-center h-full text-gray-600 dark:text-gray-300">
                    <h3 className="text-lg font-medium mb-4">
                        Özet
                    </h3>

                    {chartData.length === 0 ? (
                        <div className="text-sm text-gray-500">
                            Gösterilecek veri yok.
                        </div>
                    ) : (
                        <div className="w-full max-w-xs space-y-3">
                            <div className="flex justify-between items-center text-base">
                                <span className="text-gray-500">Toplam Gelir</span>
                                <span className="font-medium text-green-600">
                                    {totalIncome.toLocaleString("tr-TR")} ₺
                                </span>
                            </div>

                            <div className="flex justify-between items-center text-base">
                                <span className="text-gray-500">Toplam Gider</span>
                                <span className="font-medium text-red-600">
                                    {totalExpense.toLocaleString("tr-TR")} ₺
                                </span>
                            </div>

                            <div className="pt-2 mt-2 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center text-base">
                                <span className="text-gray-600 dark:text-gray-400 font-medium">
                                    Net Bakiye
                                </span>
                                <span
                                    className={`font-semibold ${netBalance >= 0
                                            ? "text-green-600"
                                            : "text-red-600"
                                        }`}
                                >
                                    {netBalance.toLocaleString("tr-TR")} ₺
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            )
            }

        </div>
    );
}
