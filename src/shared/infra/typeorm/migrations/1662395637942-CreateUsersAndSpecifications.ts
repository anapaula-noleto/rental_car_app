import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersAndSpecifications1662395637942
	implements MigrationInterface
{
	name = "CreateUsersAndSpecifications1662395637942";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "specifications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "crated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_621aabf71e640ab86f0e8b62a37" PRIMARY KEY ("id"))`
		);

		await queryRunner.query(
			`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, "driver_license" character varying NOT NULL, "is_admin" boolean NOT NULL DEFAULT false, "avatar" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "users"`);

		await queryRunner.query(`DROP TABLE "specifications"`);
	}
}
