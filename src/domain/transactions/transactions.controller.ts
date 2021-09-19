import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common'
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnprocessableEntityResponse } from '@nestjs/swagger'
import { PaginatedList } from '../../shared/paginatedList/types'
import paginatedListSchema from '../../shared/responses/schema/paginatedListSchema'
import UnprocessableEntitySchema from '../../shared/responses/schema/UnprocessableEntitySchema'
import { QueryString } from '../../shared/types'
import { JwtAuthGuard } from '../auth/jwtAuth.guard'
import { TenantGuard } from '../tenant/tenant.guard'
import { TenantProvider } from '../tenant/tenant.provider'
import { CreateTransactionDTO } from './dto/CreateTransactionDTO'
import { Transaction } from './entities/transaction.entity'
import { TransactionsProvider } from './transactions.provider'

@UseGuards(JwtAuthGuard, TenantGuard)
@ApiTags('Transactions')
@Controller('transactions')
export class TransactionsController {
  constructor (private transactionsProvider: TransactionsProvider, private tenantProvider: TenantProvider) {
    this.transactionsProvider = transactionsProvider
    this.tenantProvider = tenantProvider
  }

  @ApiOkResponse({ description: 'The found records.', schema: paginatedListSchema(Transaction) })
  @ApiOperation({ description: 'Retrieve many Transactions.' })
  @Get()
  async index (@Query() query: QueryString<Transaction>): Promise<PaginatedList<Transaction>> {
    return this.transactionsProvider.index(query, this.tenantProvider.tenant)
  }

  @Post()
  @ApiCreatedResponse({ description: 'Retrieve the created transaction', type: Transaction })
  @ApiUnprocessableEntityResponse({ description: 'Occurred errors trying to create transaction.', schema: UnprocessableEntitySchema() })
  @ApiOperation({ description: 'Create an Transaction.' })
  async store (@Body() createTransactionDTO: CreateTransactionDTO): Promise<Transaction> {
    return this.transactionsProvider.store(createTransactionDTO, this.tenantProvider.tenant)
  }
}
