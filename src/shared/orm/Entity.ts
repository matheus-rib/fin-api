import { HttpException } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'
import { validate, ValidatorOptions } from 'class-validator'
import { BaseEntity, BeforeInsert, BeforeUpdate, Column, PrimaryGeneratedColumn } from 'typeorm'

export abstract class Model extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ title: 'id', description: "Resource's id", example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d' })
  id: string

  @Column({ type: 'timestamp' })
  @ApiProperty({ title: 'createdAt', description: "Resource's createdAt timestamp", example: '2021-09-16T01:08:37.224Z' })
  createdAt: Date

  @Column({ type: 'timestamp' })
  @ApiProperty({ title: 'updatedAt', description: "Resource's updatedAt timestamp", example: '2021-09-16T01:08:37.224Z' })
  updatedAt: Date

  @BeforeUpdate()
  updateDate (): void {
    this.updatedAt = new Date()
  }

  @BeforeInsert()
  createDate (): void {
    this.createdAt = this.createdAt ? this.createdAt : new Date()
    this.updatedAt = this.createdAt ? this.createdAt : new Date()
  }

  @BeforeInsert()
  @BeforeUpdate()
  public async validate (validatorOptions?: ValidatorOptions): Promise<void> {
    const errors = await validate(this, validatorOptions)
    if (errors.length > 0) {
      const e = errors.map(({ target, property, constraints }) => {
        return {
          entity: target.constructor.name,
          property,
          constraints: Object.keys(constraints),
        }
      })
      throw new HttpException(e, 400)
    }
  }

  public setAttributes<T> (attributes: T): void {
    Object.keys(attributes).forEach(attribute => {
      this[attribute] = attributes[attribute]
    })
  }
}
