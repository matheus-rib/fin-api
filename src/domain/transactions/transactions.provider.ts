import { Injectable, UnprocessableEntityException } from '@nestjs/common'
import { getConnection } from 'typeorm'
import paginatedList from '../../shared/paginatedList'
import { PaginatedList } from '../../shared/paginatedList/types'
import queryPaginationStandardizer from '../../shared/queryPaginationStandardizer'
import { QueryString } from '../../shared/types'
import { AccountsProvider } from '../accounts/accounts.provider'
import { Account } from '../accounts/entities/account.entity'
import { CreateTransactionDTO } from './dto/CreateTransactionDTO'
import { Transaction } from './entities/transaction.entity'

@Injectable()
export class TransactionsProvider {
  constructor (private accountsProvider: AccountsProvider) {
    this.accountsProvider = accountsProvider
  }

  async index (query: QueryString<Transaction>, account: Account): Promise<PaginatedList<Transaction>> {
    const { where, take, skip } = queryPaginationStandardizer(query)
    const [transactions, count] = await Transaction.findAndCount({ where: { ...where, account }, take, skip })
    return paginatedList(transactions, count, { where, take, skip })
  }

  async store (createTransactionDto: CreateTransactionDTO, account: Account): Promise<Transaction> {
    try {
      return getConnection().transaction(async em => {
        const transaction = Transaction.create({ ...createTransactionDto, account })
        await em.save(transaction)
        transaction.account = await this.accountsProvider.updateAccountBalance(account, transaction, em)
        return transaction
      })
    } catch (e) {
      throw new UnprocessableEntityException(e)
    }
  }
}
