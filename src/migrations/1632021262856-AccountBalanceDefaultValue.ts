import { MigrationInterface, QueryRunner } from 'typeorm'

export class AccountBalanceDefaultValue1632021262856 implements MigrationInterface {
    name = 'AccountBalanceDefaultValue1632021262856'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "public"."accounts" ALTER COLUMN "balance" SET DEFAULT \'0\'')
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "public"."accounts" ALTER COLUMN "balance" DROP DEFAULT')
    }
}
