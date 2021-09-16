import { Injectable, UnprocessableEntityException } from '@nestjs/common'
import paginatedList from '../../shared/paginatedList'
import { PaginatedList } from '../../shared/paginatedList/types'
import queryPaginationStandardizer from '../../shared/queryPaginationStandardizer'
import { QueryString } from '../../shared/types'
import { CreateTransactionDTO } from './dto/CreateTransactionDTO'
import { Transaction } from './entities/transaction.entity'

@Injectable()
export class TransactionsProvider {
  async index (query: QueryString<Transaction>): Promise<PaginatedList<Transaction>> {
    const findObject = queryPaginationStandardizer(query)
    const [transactions, count] = await Transaction.findAndCount(findObject)
    return paginatedList(transactions, count, findObject)
  }

  async store (createTransactionDto: CreateTransactionDTO): Promise<Transaction> {
    try {
      const transaction = await Transaction.create(createTransactionDto).save()
      return transaction
    } catch (e) {
      throw new UnprocessableEntityException(e)
    }
  }
}
