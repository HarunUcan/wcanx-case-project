'use client';

import { BarChartData } from "@/types/types";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";

type SimpleBarChartProps = {
    data: BarChartData[];
    width?: string | number;
    height?: string | number;
};

export default function SimpleBarChart({
    data,
    width = "100%",
    height = "100%",
}: SimpleBarChartProps) {
    return (
        <div style={{ width, height }}>
            <ResponsiveContainer>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="income" name={"Gelir"} fill="#22c55e" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="expense" name={"Gider"} fill="#ef4444" radius={[6, 6, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
