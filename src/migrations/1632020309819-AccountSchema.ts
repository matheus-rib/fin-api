import { MigrationInterface, QueryRunner } from 'typeorm'

export class AccountSchema1632020309819 implements MigrationInterface {
    name = 'AccountSchema1632020309819'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE TABLE "accounts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, "name" character varying NOT NULL, "balance" integer NOT NULL, "subdomain" character varying NOT NULL, CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id"))')
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('DROP TABLE "accounts"')
    }
}
