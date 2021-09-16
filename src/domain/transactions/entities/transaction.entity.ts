import { ApiProperty } from '@nestjs/swagger'
import { IsDateString, IsIn, IsInt, IsNotEmpty, IsString } from 'class-validator'
import { Column, Entity } from 'typeorm'
import { Model } from '../../../shared/orm/Entity'

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
  @Column({ nullable: false, type: 'timestamp', default: Date.now })
  @ApiProperty({ title: 'paymentDate', example: '2021-09-16T01:08:37.224Z', description: 'Transaction payment date' })
  @IsDateString()
  @IsNotEmpty()
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
}
