import { Module } from '@nestjs/common'
import { AccountsModule } from '../accounts/accounts.module'
import { TransactionsController } from './transactions.controller'
import { TransactionsProvider } from './transactions.provider'

@Module({
  imports: [AccountsModule],
  controllers: [TransactionsController],
  providers: [TransactionsProvider],
})
export class TransactionsModule {}
