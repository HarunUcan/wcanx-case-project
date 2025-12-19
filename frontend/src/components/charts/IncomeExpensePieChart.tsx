'use client'
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

type Props = {
    gelir: number;
    gider: number;
};

type PieDataItem = {
    name: string;
    value: number;
    key: "gelir" | "gider";
};

const COLORS: Record<PieDataItem["key"], string> = {
    gelir: "#22c55e", // green
    gider: "#ef4444", // red
};

export default function IncomeExpensePieChart({
    gelir,
    gider,
}: Props) {
    const data: PieDataItem[] = [
        { name: "Gelir", value: gelir, key: "gelir" },
        { name: "Gider", value: gider, key: "gider" },
    ];

    const toplam: number = gelir + gider;

    return (
        <div className="relative w-full h-72">
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={100}
                        paddingAngle={3}
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={index}
                                fill={COLORS[entry.key]}
                            />
                        ))}
                    </Pie>

                    <Tooltip
                        formatter={(value: number | undefined) => `${value ?? 0} ₺`}
                    />

                </PieChart>
            </ResponsiveContainer>

            {/* ORTA TOPLAM */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-sm text-gray-500">Toplam</span>
                <span className="text-xl font-semibold">
                    {toplam} ₺
                </span>
            </div>
        </div>
    );
}
