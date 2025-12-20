import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Transaction, TransactionDocument } from './schemas/transaction.schema';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionsService {
    constructor(
        @InjectModel(Transaction.name)
        private readonly transactionModel: Model<TransactionDocument>,
    ) { }

    async create(userId: string, dto: CreateTransactionDto) {
        return this.transactionModel.create({
            ...dto,
            userId: new Types.ObjectId(userId),
            date: new Date(dto.date),
        });
    }

    async findAllByUser(userId: string, month?: string) {
        const filter: any = {
            userId: new Types.ObjectId(userId),
        };

        if (month) {
            // month: "2025-12"
            const [year, m] = month.split('-').map(Number);

            const start = new Date(year, m - 1, 1);
            const end = new Date(year, m, 1); // bir sonraki ayın 1'i

            filter.date = {
                $gte: start,
                $lt: end,
            };
        }

        return this.transactionModel
            .find(filter)
            .sort({ date: -1 })
            .exec();
    }


    async remove(userId: string, transactionId: string) {
        const transaction = await this.transactionModel.findById(transactionId);
        if (!transaction) throw new NotFoundException('Kayıt bulunamadı');

        if (transaction.userId.toString() !== userId) {
            throw new ForbiddenException('Bu kaydı silme yetkiniz yok');
        }

        await transaction.deleteOne();
    }

    async update(
        userId: string,
        transactionId: string,
        dto: UpdateTransactionDto,
    ) {
        const transaction = await this.transactionModel.findById(transactionId);

        if (!transaction) {
            throw new NotFoundException('Kayıt bulunamadı');
        }

        if (transaction.userId.toString() !== userId) {
            throw new ForbiddenException('Bu kaydı güncelleme yetkiniz yok');
        }

        // Alan bazlı güncelleme
        if (dto.type !== undefined) transaction.type = dto.type;
        if (dto.category !== undefined) transaction.category = dto.category;
        if (dto.amount !== undefined) transaction.amount = dto.amount;
        if (dto.date !== undefined) transaction.date = new Date(dto.date);
        if (dto.note !== undefined) transaction.note = dto.note;

        await transaction.save();

        return transaction;
    }


}
