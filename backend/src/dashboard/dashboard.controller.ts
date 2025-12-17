import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import type { CurrentUserPayload } from '../common/decorators/current-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('dashboard')
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) { }

    // GET /dashboard/summary?month=2025-12
    @Get('summary')
    getSummary(
        @CurrentUser() user: CurrentUserPayload,
        @Query('month') month: string,
    ) {
        return this.dashboardService.getMonthlySummary(user.userId, month);
    }

    // GET /dashboard/income-expense?year=2025
    @Get('income-expense')
    getIncomeExpense(
        @CurrentUser() user: CurrentUserPayload,
        @Query('year') yearStr: string,
    ) {
        const year = Number(yearStr);
        return this.dashboardService.getIncomeExpenseByMonth(user.userId, year);
    }

    // GET /dashboard/expense-by-category?month=2025-12
    @Get('expense-by-category')
    getExpenseByCategory(
        @CurrentUser() user: CurrentUserPayload,
        @Query('month') month: string,
    ) {
        return this.dashboardService.getExpenseByCategory(user.userId, month);
    }
}
