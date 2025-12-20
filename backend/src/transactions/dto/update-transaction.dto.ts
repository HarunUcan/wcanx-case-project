import { IsDateString, IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { TransactionType } from '../schemas/transaction.schema';

export class UpdateTransactionDto {
    @IsEnum(TransactionType)
    type: TransactionType;

    @IsString()
    category: string;

    @IsNumber()
    @Min(0.01)
    amount: number;

    @IsDateString()
    date: string;

    @IsOptional()
    @IsString()
    note?: string;
}
