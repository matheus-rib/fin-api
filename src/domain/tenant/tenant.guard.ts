import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { TenantProvider } from './tenant.provider'

@Injectable()
export class TenantGuard implements CanActivate {
  constructor (private tenantProvider: TenantProvider) {
    this.tenantProvider = tenantProvider
  }

  async canActivate (context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const subdomain = request.user.subdomain
    await this.tenantProvider.setTenantBySubdomain(subdomain)
    return true
  }
}
