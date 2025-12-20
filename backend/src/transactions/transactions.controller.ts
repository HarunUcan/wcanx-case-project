import { Body, Controller, Delete, Get, Param, Post, Patch, UseGuards, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import type { CurrentUserPayload } from '../common/decorators/current-user.decorator';
import { UpdateTransactionDto } from './dto/update-transaction.dto';


@UseGuards(JwtAuthGuard)
@Controller('transactions')
export class TransactionsController {
    constructor(private readonly transactionsService: TransactionsService) { }

    @Post()
    create(
        @Body() dto: CreateTransactionDto,
        @CurrentUser() user: CurrentUserPayload,
    ) {
        return this.transactionsService.create(user.userId, dto);
    }

    @Get()
    findAll(
        @CurrentUser() user: CurrentUserPayload,
        @Query('month') month?: string, // YYYY-MM
    ) {
        return this.transactionsService.findAllByUser(user.userId, month);
    }

    @Delete(':id')
    remove(
        @Param('id') id: string,
        @CurrentUser() user: CurrentUserPayload,
    ) {
        return this.transactionsService.remove(user.userId, id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() dto: UpdateTransactionDto,
        @CurrentUser() user: CurrentUserPayload,
    ) {
        return this.transactionsService.update(user.userId, id, dto);
    }

}
