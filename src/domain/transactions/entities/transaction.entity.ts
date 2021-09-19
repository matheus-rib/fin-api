import { ApiProperty } from '@nestjs/swagger'
import { IsDateString, IsIn, IsInt, IsNotEmpty, IsString, ValidateIf } from 'class-validator'
import { Column, Entity, ManyToOne } from 'typeorm'
import { Model } from '../../../shared/orm/Entity'
import { Account } from '../../accounts/entities/account.entity'

export enum TransactionCategory {
  PAYMENT = 'payment',
  LOAN = 'loan'
}

export enum TransactionType {
  CREDIT = 'credit',
  DEBIT = 'debit',
}

@Entity('transactions')
export class Transaction extends Model {
  @Column({ nullable: true, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({ title: 'paymentDate', example: '2021-09-16T01:08:37.224Z', description: 'Transaction payment date' })
  @ValidateIf(transaction => !!transaction.paymentDate)
  @IsDateString()
  paymentDate: Date

  @Column({ nullable: false })
  @ApiProperty({ title: 'name', example: 'Paycheck', description: 'Transaction name' })
  @IsNotEmpty()
  @IsString()
  name: string

  @Column({ nullable: false, type: 'text' })
  @ApiProperty({ title: 'description', example: 'Monthly paycheck', description: 'Transaction description' })
  @IsNotEmpty()
  @IsString()
  description: string

  @Column({ nullable: false, type: 'enum', enum: TransactionCategory })
  @ApiProperty({ title: 'category', enum: TransactionCategory, description: "Transaction's category" })
  @IsNotEmpty()
  @IsIn(Object.values(TransactionCategory))
  category: TransactionCategory

  @Column({ type: 'int' })
  @ApiProperty({ title: 'amount', example: 100000, description: 'An integer that represent a decimal transaction. For 100.00$, must inform: 100000' })
  @IsNotEmpty()
  @IsInt()
  amount: number

  @Column({ nullable: false, type: 'enum', enum: TransactionType })
  @ApiProperty({ title: 'type', enum: TransactionType, description: "Transaction's type" })
  @IsNotEmpty()
  @IsIn(Object.values(TransactionType))
  type: TransactionType

  @ManyToOne(() => Account, account => account.transactions)
  account: Account
}
