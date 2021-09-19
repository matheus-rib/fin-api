import { Module } from '@nestjs/common'
import { JwtStrategyProvider } from './jwt-strategy/jwtStategy.provider'

@Module({
  providers: [JwtStrategyProvider],
})
export class AuthModule {}
