import { AccountsModule } from '../domain/accounts/accounts.module'
import { AuthModule } from '../domain/auth/auths.module'
import { TenantModule } from '../domain/tenant/tenant.module'
import { TransactionsModule } from '../domain/transactions/transactions.module'

export default [
  AccountsModule,
  AuthModule,
  TenantModule,
  TransactionsModule,
]
