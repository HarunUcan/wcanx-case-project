import { api } from './api';

export type DashboardSummary = {
    month: string;
    totalIncome: number;
    totalExpense: number;
    balance: number;
};

export type IncomeExpenseRow = {
    month: string; // "YYYY-MM"
    income: number;
    expense: number;
};

export type ExpenseByCategoryRow = {
    category: string;
    amount: number;
};

export const dashboardService = {
    async getSummary(month: string) {
        const res = await api.get<DashboardSummary>(`/dashboard/summary`, { params: { month } });
        return res.data;
    },

    async getIncomeExpense(year: number) {
        const res = await api.get<IncomeExpenseRow[]>(`/dashboard/income-expense`, { params: { year } });
        return res.data;
    },

    async getExpenseByCategory(month: string) {
        const res = await api.get<ExpenseByCategoryRow[]>(`/dashboard/expense-by-category`, { params: { month } });
        return res.data;
    },
};
