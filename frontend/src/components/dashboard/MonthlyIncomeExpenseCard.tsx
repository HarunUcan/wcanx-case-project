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
        <div className="flex flex-col bg-white items-between h-100 2xl:h-150 gap-6 lg:w-1/2 shadow-xl border border-gray-200 rounded-[50px] py-8">
            <div className="flex justify-between items-start px-12">
                <div className="flex flex-col justify-center">
                    <span className="font-bold text-xl 2xl:text-3xl text-gray-800">{title}</span>
                    <span className="text-sm 2xl:text-xl text-gray-600">{subtitle}</span>
                </div>

                <div className="relative">
                    <button
                        type="button"
                        onClick={() => setIsMenuOpen((v) => !v)}
                        className="flex justify-center items-center text-gray-800 text-2xl 2xl:text-4xl font-bold cursor-pointer"
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

            <div className="flex justify-center items-center w-full h-full py-8 px-2 lg:px-12 lg:py-0">
                <SimpleBarChart data={chartData} />
            </div>
        </div>
    );
}
