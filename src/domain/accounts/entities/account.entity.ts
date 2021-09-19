import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'
import { Column, Entity, OneToMany } from 'typeorm'
import { Model } from '../../../shared/orm/Entity'
import { Transaction } from '../../transactions/entities/transaction.entity'

@Entity('accounts')
export class Account extends Model {
  @Column({ nullable: false })
  @ApiProperty({ title: 'name', example: 'Account 1', description: 'The name of the account' })
  @IsNotEmpty()
  @IsString()
  name: string

  @Column({ type: 'int', default: 0 })
  balance: number

  @Column({ nullable: false })
  @ApiProperty({ title: 'subdomain', example: 'tenant1', description: 'The subdomain the account belongs to' })
  @IsNotEmpty()
  @IsString()
  subdomain: string

  @OneToMany(() => Transaction, transaction => transaction.account)
  transactions: Array<Transaction>
}
