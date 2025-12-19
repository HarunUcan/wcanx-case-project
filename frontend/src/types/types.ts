export type BarChartData = {
    name: string;
    income: number;
    expense: number;
};

type TransactionType = 'Gelir' | 'Gider';

export type Transaction = {
    id: string;
    type: TransactionType;
    category: string;
    date: string;
    amount: number;
}