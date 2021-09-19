import { MigrationInterface, QueryRunner } from 'typeorm'

export class TransactionPaymentDateDefaultValue1632020186121 implements MigrationInterface {
    name = 'TransactionPaymentDateDefaultValue1632020186121'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "public"."transactions" ALTER COLUMN "paymentDate" DROP NOT NULL')
      await queryRunner.query('ALTER TABLE "public"."transactions" ALTER COLUMN "paymentDate" SET DEFAULT now()')
      await queryRunner.query('ALTER TABLE "public"."transactions" DROP COLUMN "description"')
      await queryRunner.query('ALTER TABLE "public"."transactions" ADD "description" text NOT NULL')
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "public"."transactions" DROP COLUMN "description"')
      await queryRunner.query('ALTER TABLE "public"."transactions" ADD "description" character varying NOT NULL')
      await queryRunner.query('ALTER TABLE "public"."transactions" ALTER COLUMN "paymentDate" DROP DEFAULT')
      await queryRunner.query('ALTER TABLE "public"."transactions" ALTER COLUMN "paymentDate" SET NOT NULL')
    }
}
