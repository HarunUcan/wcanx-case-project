import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type TransactionDocument = HydratedDocument<Transaction>;

export enum TransactionType {
    INCOME = 'income',
    EXPENSE = 'expense',
}

@Schema({ timestamps: true })
export class Transaction {
    @Prop({ type: Types.ObjectId, required: true, index: true })
    userId: Types.ObjectId;

    @Prop({ required: true, enum: TransactionType })
    type: TransactionType;

    @Prop({ required: true })
    category: string;

    @Prop({ required: true, min: 0.01 })
    amount: number;

    @Prop({ required: true })
    date: Date;

    @Prop()
    note?: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
