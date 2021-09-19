import { Module } from '@nestjs/common'
import { AccountsController } from './accounts.controller'
import { AccountsProvider } from './accounts.provider'

@Module({
  exports: [AccountsProvider],
  controllers: [AccountsController],
  providers: [AccountsProvider],
})

export class AccountsModule {}
