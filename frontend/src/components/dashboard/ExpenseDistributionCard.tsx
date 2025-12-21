'use client';

import React, { useMemo } from "react";
import CategoryDonut from "@/components/charts/CategoryDonut";

export type DonutItem = {
    name: string;
    value: number;
    color: string;
};

type ExpenseDistributionCardProps = {
    title: string;
    subtitle: string;
    totalLabel?: string; // "Toplam"
    totalAmount?: number;
    currencySymbol?: string; // ₺
    data: DonutItem[];
};

export function ExpenseDistributionCard({
    title,
    subtitle,
    totalLabel = "Toplam",
    totalAmount,
    currencySymbol = "₺",
    data,
}: ExpenseDistributionCardProps) {
    const computedTotal = useMemo(
        () => data.reduce((acc, item) => acc + item.value, 0),
        [data]
    );

    const total = totalAmount ?? computedTotal;

    return (
        <div className="flex flex-col bg-white dark:bg-gray-800 items-between h-100 2xl:h-150 gap-6 lg:w-1/2 shadow-xl dark:shadow-gray-700/40 border border-gray-200 dark:border-gray-700 rounded-[50px] py-8 transition-colors duration-300">
            <div className="flex justify-between items-start px-12">
                <div className="flex flex-col justify-center">
                    <span className="font-bold text-xl 2xl:text-3xl text-gray-800 dark:text-white">{title}</span>
                    <span className="text-sm 2xl:text-xl text-gray-600 dark:text-gray-400">{subtitle}</span>
                </div>

                <div className="flex flex-col justify-center">
                    <span className="font-bold text-gray-400 dark:text-gray-500 text-sm 2xl:text-2xl">{totalLabel}</span>
                    <span className="font-bold text-gray-800 dark:text-white 2xl:text-2xl">
                        {total.toLocaleString("tr-TR")}
                        {currencySymbol}
                    </span>
                </div>
            </div>

            <CategoryDonut data={data} />
        </div>
    );
}
