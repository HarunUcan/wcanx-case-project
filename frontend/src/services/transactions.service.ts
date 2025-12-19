import { api } from './api';

export type TransactionType = 'income' | 'expense';

export type TransactionDto = {
    _id: string;
    type: TransactionType;
    category: string;
    amount: number;
    date: string; // ISO
    note?: string;
    createdAt?: string;
    updatedAt?: string;
};

export type CreateTransactionRequest = {
    type: TransactionType;
    category: string;
    amount: number;
    date: string; // YYYY-MM-DD
    note?: string;
};

export const transactionsService = {
    async list() {
        const res = await api.get<TransactionDto[]>('/transactions');
        return res.data;
    },

    async remove(id: string) {
        const res = await api.delete(`/transactions/${id}`);
        return res.data;
    },

    async create(data: CreateTransactionRequest) {
        const res = await api.post<TransactionDto>('/transactions', data);
        return res.data;
    },
};
