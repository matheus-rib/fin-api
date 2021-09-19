import { Global, Module } from '@nestjs/common'
import { TenantProvider } from './tenant.provider'

@Global()
@Module({
  providers: [TenantProvider],
  exports: [TenantProvider],
})
export class TenantModule {}
