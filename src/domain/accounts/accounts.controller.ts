import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Query } from '@nestjs/common'
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnprocessableEntityResponse } from '@nestjs/swagger'
import { PaginatedList } from '../../shared/paginatedList/types'
import { NotFoundDTO } from '../../shared/responses/dto/NotFoundDTO'
import paginatedListSchema from '../../shared/responses/schema/paginatedListSchema'
import UnprocessableEntitySchema from '../../shared/responses/schema/UnprocessableEntitySchema'
import { QueryString } from '../../shared/types'
import { AccountsProvider } from './accounts.provider'
import { CreateAccountDTO } from './dto/CreateAccountDTO'
import { Account } from './entities/account.entity'

@ApiTags('Accounts')
@Controller('accounts')
export class AccountsController {
  constructor (private accountsProvider: AccountsProvider) {
    this.accountsProvider = accountsProvider
  }

  @ApiOkResponse({ description: 'The found records.', schema: paginatedListSchema(Account) })
  @ApiOperation({ description: 'Retrieve many Accounts.' })
  @Get()
  async index (@Query() query: QueryString<Account>): Promise<PaginatedList<Account>> {
    return this.accountsProvider.index(query)
  }

  @ApiOkResponse({ description: 'Retrieve the name by the Id.', type: Account })
  @ApiNotFoundResponse({ description: 'Account not found.', type: NotFoundDTO })
  @ApiOperation({ description: 'Retrieve a single Account.' })
  @Get(':accountId')
  async show (@Param('accountId', new ParseUUIDPipe()) accountId: string): Promise<Account> {
    return this.accountsProvider.show(accountId)
  }

  @Post()
  @ApiCreatedResponse({ description: 'Retrieve the created name', type: Account })
  @ApiUnprocessableEntityResponse({ description: 'Occurred errors trying to create account.', schema: UnprocessableEntitySchema() })
  @ApiOperation({ description: 'Create an Account.' })
  async store (@Body() createAccountDTO: CreateAccountDTO): Promise<Account> {
    return this.accountsProvider.store(createAccountDTO)
  }
}
