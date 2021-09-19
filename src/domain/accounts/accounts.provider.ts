import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common'
import { EntityManager } from 'typeorm'
import paginatedList from '../../shared/paginatedList'
import { PaginatedList } from '../../shared/paginatedList/types'
import queryPaginationStandardizer from '../../shared/queryPaginationStandardizer'
import { QueryString } from '../../shared/types'
import { Transaction, TransactionType } from '../transactions/entities/transaction.entity'
import { CreateAccountDTO } from './dto/CreateAccountDTO'
import { Account } from './entities/account.entity'

@Injectable()
export class AccountsProvider {
  async index (query: QueryString<Account>): Promise<PaginatedList<Account>> {
    const findObject = queryPaginationStandardizer(query)
    const [transactions, count] = await Account.findAndCount(findObject)
    return paginatedList(transactions, count, findObject)
  }

  async show (accountId: string): Promise<Account> {
    try {
      const account = await Account.findOneOrFail(accountId)

      return account
    } catch (e) {
      throw new NotFoundException(e)
    }
  }

  async store (createAccountDto: CreateAccountDTO): Promise<Account> {
    try {
      const transaction = await Account.create(createAccountDto).save()
      return transaction
    } catch (e) {
      throw new UnprocessableEntityException(e)
    }
  }

  async updateAccountBalance (account: Account, transaction: Transaction, em: EntityManager): Promise<Account> {
    account.balance += transaction.type === TransactionType.CREDIT ? transaction.amount : transaction.amount * -1

    return em.save(account)
  }
}
