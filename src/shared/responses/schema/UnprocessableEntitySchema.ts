import { HttpStatus } from '@nestjs/common'
import { ReferenceObject, SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface'

export default function (): SchemaObject & Partial<ReferenceObject> {
  return {
    properties: {
      response: {
        type: 'array',
        items: {
          type: 'object',
          example: {
            entity: 'Model',
            property: 'Type',
            constraints: ['isString'],
          },
          properties: {
            entity: { type: 'string' },
            property: { type: 'string' },
            constraints: { type: 'array', items: { type: 'string' } },
          },
        },
      },
      status: {
        type: 'number',
        description: 'HTTP status response',
        example: HttpStatus.UNPROCESSABLE_ENTITY,
      },
      message: {
        type: 'string',
        description: 'HTTP message response',
        example: 'Http Exception',
      },
      name: {
        type: 'string',
        description: 'HTTP message name',
        example: 'HttpException',
      },
    },
  }
}
