import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Transaction, TransactionDocument, TransactionType } from '../transactions/schemas/transaction.schema';

function monthRange(month: string) {
    // month: "YYYY-MM"
    const [yStr, mStr] = month.split('-');
    const y = Number(yStr);
    const m = Number(mStr);

    if (!Number.isFinite(y) || !Number.isFinite(m) || m < 1 || m > 12) {
        throw new Error('Geçersiz ay formatı. Beklenen "YYYY-MM"');
    }

    const start = new Date(Date.UTC(y, m - 1, 1, 0, 0, 0, 0));
    const end = new Date(Date.UTC(y, m, 1, 0, 0, 0, 0)); // sonraki ay
    return { start, end };
}

@Injectable()
export class DashboardService {
    constructor(
        @InjectModel(Transaction.name)
        private readonly transactionModel: Model<TransactionDocument>,
    ) { }

    async getMonthlySummary(userId: string, month: string) {
        const { start, end } = monthRange(month);
        const uid = new Types.ObjectId(userId);

        const rows = await this.transactionModel.aggregate([
            { $match: { userId: uid, date: { $gte: start, $lt: end } } },
            {
                $group: {
                    _id: '$type',
                    total: { $sum: '$amount' },
                },
            },
        ]);

        const totalIncome = rows.find(r => r._id === TransactionType.INCOME)?.total ?? 0;
        const totalExpense = rows.find(r => r._id === TransactionType.EXPENSE)?.total ?? 0;

        return {
            month,
            totalIncome,
            totalExpense,
            balance: totalIncome - totalExpense,
        };
    }

    async getIncomeExpenseByMonth(userId: string, year: number) {
        if (!Number.isFinite(year) || year < 2000 || year > 3000) {
            throw new Error('Geçersiz yıl formatı');
        }

        const uid = new Types.ObjectId(userId);
        const start = new Date(Date.UTC(year, 0, 1, 0, 0, 0, 0));
        const end = new Date(Date.UTC(year + 1, 0, 1, 0, 0, 0, 0));

        const rows = await this.transactionModel.aggregate([
            { $match: { userId: uid, date: { $gte: start, $lt: end } } },
            {
                $group: {
                    _id: {
                        month: { $dateToString: { format: '%Y-%m', date: '$date' } },
                        type: '$type',
                    },
                    total: { $sum: '$amount' },
                },
            },
            {
                $group: {
                    _id: '$_id.month',
                    income: {
                        $sum: {
                            $cond: [{ $eq: ['$_id.type', TransactionType.INCOME] }, '$total', 0],
                        },
                    },
                    expense: {
                        $sum: {
                            $cond: [{ $eq: ['$_id.type', TransactionType.EXPENSE] }, '$total', 0],
                        },
                    },
                },
            },
            { $project: { _id: 0, month: '$_id', income: 1, expense: 1 } },
            { $sort: { month: 1 } },
        ]);

        return rows;
    }

    async getExpenseByCategory(userId: string, month: string) {
        const { start, end } = monthRange(month);
        const uid = new Types.ObjectId(userId);

        const rows = await this.transactionModel.aggregate([
            {
                $match: {
                    userId: uid,
                    type: TransactionType.EXPENSE,
                    date: { $gte: start, $lt: end },
                },
            },
            {
                $group: {
                    _id: '$category',
                    amount: { $sum: '$amount' },
                },
            },
            { $project: { _id: 0, category: '$_id', amount: 1 } },
            { $sort: { amount: -1 } },
        ]);

        return rows;
    }
}
