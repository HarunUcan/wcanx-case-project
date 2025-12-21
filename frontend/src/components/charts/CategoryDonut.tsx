"use client";

import React, { useMemo } from "react";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Label,
} from "recharts";

type Item = {
    name: string;
    value: number;
    color: string;
};

type Props = {
    data: Item[];
    currency?: string;
};

function formatMoneyTR(value: number, currency: string) {
    return `${value.toLocaleString("tr-TR")} ${currency}`;
}

export default function CategoryDonut({ data, currency = "₺" }: Props) {
    const maxItem = useMemo(() => {
        if (!data?.length) return null;
        return data.reduce((a, b) => (b.value > a.value ? b : a));
    }, [data]);

    if (!data?.length) return null;

    return (
        <div className="w-full">
            {/* justify-center: İçeriği ortalar.
                gap-8: Grafik ve Legend arasındaki boşluğu sabitler.
            */}
            <div className="flex flex-col items-center lg:flex-row justify-center gap-8">

                {/* CHART ALANI 
                    ÖNEMLİ DEĞİŞİKLİK:
                    w-full yerine sabit pixel değerleri verdik.
                    w-[260px] -> Mobil
                    lg:w-[300px] -> Laptop
                    2xl:w-[360px] -> Büyük Ekran
                    Böylece grafik kutusu gereksiz uzamaz ve legend uzaklaşmaz.
                */}
                <div className="relative w-[260px] h-[210px] lg:w-[300px] 2xl:w-[360px] 2xl:h-[360px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                innerRadius="60%"
                                outerRadius="80%"
                                paddingAngle={2}
                                startAngle={90}
                                endAngle={-270}
                                stroke="none"
                            >
                                {data.map((entry, idx) => (
                                    <Cell key={idx} fill={entry.color} />
                                ))}

                                {/* Center label */}
                                <Label
                                    position="center"
                                    content={() => {
                                        if (!maxItem) return null;
                                        return (
                                            <g>
                                                <text
                                                    x="50%"
                                                    y="46%"
                                                    textAnchor="middle"
                                                    dominantBaseline="middle"
                                                    className="text-xs lg:text-sm 2xl:text-3xl fill-gray-500 dark:fill-gray-400"
                                                >
                                                    En Yüksek
                                                </text>
                                                <text
                                                    x="50%"
                                                    y="56%"
                                                    textAnchor="middle"
                                                    dominantBaseline="middle"
                                                    fill={maxItem.color}
                                                    className="text-sm lg:text-lg 2xl:text-2xl font-bold"
                                                >
                                                    {maxItem.name}
                                                </text>
                                            </g>
                                        );
                                    }}
                                />
                            </Pie>
                            <Tooltip
                                contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                                formatter={(value: any, name: any) => {
                                    const n = Number(value);
                                    return [`${n.toLocaleString("tr-TR")} ₺`, name];
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* LEGEND ALANI */}
                <div className="flex-shrink-0">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                        {data.map((item) => (
                            <div key={item.name} className="flex items-start gap-2">
                                <span
                                    className="mt-1.5 h-3 w-3 rounded-full flex-shrink-0"
                                    style={{ backgroundColor: item.color }}
                                />
                                <div className="leading-tight">
                                    <div className="text-xs lg:text-sm text-gray-500 dark:text-gray-400">{item.name}</div>
                                    <div className="text-sm lg:text-base font-bold text-gray-800 dark:text-gray-200">
                                        {formatMoneyTR(item.value, currency)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}