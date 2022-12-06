import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUsers1664998830584 implements MigrationInterface {
	name = "UpdateUsers1664998830584";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "users" DROP CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710"`
		);
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "username"`);
		await queryRunner.query(
			`ALTER TABLE "users" ALTER COLUMN "avatar" DROP NOT NULL`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "users" ALTER COLUMN "avatar" SET NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "users" ADD "username" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "users" ADD CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username")`
		);
	}
}
