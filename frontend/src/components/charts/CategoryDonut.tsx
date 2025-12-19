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
import type {
    NameType,
    ValueType,
} from "recharts/types/component/DefaultTooltipContent";

type Item = {
    name: string;
    value: number;
    color: string;
};

type Props = {
    data: Item[];
    currency?: string; // "₺"
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
        <div className="w-full bg-white rounded-2xl p-6">
            <div className="flex items-center gap-4">
                {/* CHART */}
                <div className="w-[260px] h-[180px]">
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                innerRadius={55}
                                outerRadius={80}
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
                                                    y="48%"
                                                    textAnchor="middle"
                                                    dominantBaseline="middle"
                                                    fontSize="12"
                                                    fill="#6b7280"
                                                >
                                                    En Yüksek
                                                </text>
                                                <text
                                                    x="50%"
                                                    y="58%"
                                                    textAnchor="middle"
                                                    dominantBaseline="middle"
                                                    fontSize="16"
                                                    fontWeight="700"
                                                    fill={maxItem.color}
                                                >
                                                    {maxItem.name}
                                                </text>
                                            </g>
                                        );
                                    }}
                                />
                            </Pie>

                            <Tooltip
                                formatter={(
                                    value: string | number | readonly (string | number)[] | undefined,
                                    name: string | number | undefined
                                ) => {
                                    const raw = Array.isArray(value) ? value[0] : value;
                                    const n = typeof raw === "number" ? raw : Number(raw ?? 0);

                                    return [`${n.toLocaleString("tr-TR")} ₺`, String(name ?? "")];
                                }}
                            />

                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* LEGEND (right) */}
                <div className="flex-1">
                    <div className="grid grid-cols-2 gap-x-10 gap-y-4">
                        {data.map((item) => (
                            <div key={item.name} className="flex items-start gap-3">
                                <span
                                    className="mt-1 h-3 w-3 rounded-full"
                                    style={{ backgroundColor: item.color }}
                                />
                                <div className="leading-tight">
                                    <div className="text-sm text-gray-600">{item.name}</div>
                                    <div className="text-sm font-semibold text-gray-900">
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
