/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { getSchemaPath } from '@nestjs/swagger'
import { ReferenceObject, SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface'

export default function (entity: any): SchemaObject & Partial<ReferenceObject> {
  return {
    properties: {
      page: {
        type: 'number',
        default: 1,
        description: 'Current page number',
        example: 1,
      },
      pages: {
        type: 'number',
        description: 'Total pages number',
        example: 1,
      },
      count: {
        type: 'number',
        description: 'Total results',
        example: 1,
      },
      rows: {
        type: 'array',
        items: {
          $ref: getSchemaPath(entity),
        },
      },
    },
  }
}
