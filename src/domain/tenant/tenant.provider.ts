import { Injectable } from '@nestjs/common'
import { Account } from '../accounts/entities/account.entity'

@Injectable()
export class TenantProvider {
  private account?: Account

  get tenant (): Account {
    return this.account
  }

  set tenant (account: Account) {
    this.account = account
  }

  async setTenantBySubdomain (subdomain: string): Promise<void> {
    this.tenant = await Account.findOne({ where: { subdomain } })
  }
}
