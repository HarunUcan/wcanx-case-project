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
        <div className="flex flex-col items-between h-100 gap-6 w-1/2 shadow-[0px_8px_30px_8px_rgba(0,_0,_0,_0.1)] border border-gray-200 rounded-[50px] py-8">
            <div className="flex justify-between items-start px-12">
                <div className="flex flex-col justify-center">
                    <span className="font-bold text-xl text-gray-800">{title}</span>
                    <span className="text-sm text-gray-600">{subtitle}</span>
                </div>

                <div className="flex flex-col justify-center">
                    <span className="font-bold text-gray-400 text-sm">{totalLabel}</span>
                    <span className="font-bold text-gray-800">
                        {total.toLocaleString("tr-TR")}
                        {currencySymbol}
                    </span>
                </div>
            </div>

            <CategoryDonut data={data} />
        </div>
    );
}
