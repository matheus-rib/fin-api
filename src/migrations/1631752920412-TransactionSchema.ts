import { MigrationInterface, QueryRunner } from 'typeorm'

export class TransactionSchema1631752920412 implements MigrationInterface {
    name = 'TransactionSchema1631752920412'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE TYPE "transactions_category_enum" AS ENUM(\'payment\', \'loan\')')
      await queryRunner.query('CREATE TYPE "transactions_type_enum" AS ENUM(\'credit\', \'debit\')')
      await queryRunner.query('CREATE TABLE "transactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, "paymentDate" TIMESTAMP NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "category" "transactions_category_enum" NOT NULL, "amount" integer NOT NULL, "type" "transactions_type_enum" NOT NULL, CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))')
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('DROP TABLE "transactions"')
      await queryRunner.query('DROP TYPE "transactions_type_enum"')
      await queryRunner.query('DROP TYPE "transactions_category_enum"')
    }
}
