import { OmitType } from '@nestjs/swagger'
import { Transaction } from '../entities/transaction.entity'

export class CreateTransactionDTO extends OmitType(Transaction, ['id', 'createdAt', 'updatedAt']) {}
