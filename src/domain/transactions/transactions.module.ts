import { Module } from '@nestjs/common'
import { TransactionsController } from './transactions.controller'
import { TransactionsProvider } from './transactions.provider'

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsProvider],
})
export class TransactionsModule {}
