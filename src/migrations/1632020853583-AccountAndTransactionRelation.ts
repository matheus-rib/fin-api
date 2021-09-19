import { MigrationInterface, QueryRunner } from 'typeorm'

export class AccountAndTransactionRelation1632020853583 implements MigrationInterface {
    name = 'AccountAndTransactionRelation1632020853583'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "public"."transactions" ADD "accountId" uuid')
      await queryRunner.query('ALTER TABLE "public"."transactions" ADD CONSTRAINT "FK_26d8aec71ae9efbe468043cd2b9" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "public"."transactions" DROP CONSTRAINT "FK_26d8aec71ae9efbe468043cd2b9"')
      await queryRunner.query('ALTER TABLE "public"."transactions" DROP COLUMN "accountId"')
    }
}
