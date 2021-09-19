import { OmitType } from '@nestjs/swagger'
import { Account } from '../entities/account.entity'

export class CreateAccountDTO extends OmitType(Account, ['id', 'createdAt', 'updatedAt', 'balance']) {}
