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

    return (
        <div className="flex flex-col items-between h-100 gap-6 w-1/2 shadow-[0px_8px_30px_8px_rgba(0,_0,_0,_0.1)] border border-gray-200 rounded-[50px] px-12 py-8">
            <div className="flex justify-between items-start">
                <div className="flex flex-col justify-center">
                    <span className="font-bold text-xl text-gray-800">{title}</span>
                    <span className="text-sm text-gray-600">{subtitle}</span>
                </div>

                <div className="relative">
                    <button
                        type="button"
                        onClick={() => setIsMenuOpen((v) => !v)}
                        className="flex justify-center items-center text-gray-800 text-2xl font-bold cursor-pointer"
                        aria-label="menu"
                    >
                        <HiDotsHorizontal />
                    </button>

                    {isMenuOpen && (
                        <div className="absolute right-0 mt-2 w-40 rounded-2xl border border-gray-200 bg-white shadow-lg overflow-hidden">
                            <button
                                type="button"
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                onClick={() => {
                                    // örnek aksiyon
                                    setIsMenuOpen(false);
                                    console.log("Refresh clicked");
                                }}
                            >
                                Refresh
                            </button>
                            <button
                                type="button"
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                onClick={() => {
                                    setIsMenuOpen(false);
                                    console.log("Details clicked");
                                }}
                            >
                                Details
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex justify-center items-center w-full h-full">
                <SimpleBarChart data={chartData} height={chartHeight} />
            </div>
        </div>
    );
}
