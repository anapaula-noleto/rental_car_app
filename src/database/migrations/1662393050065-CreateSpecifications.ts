import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSpecifications1662393050065 implements MigrationInterface {
	name = "CreateSpecifications1662393050065";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "specification" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "crated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_01b2d90197e187e3187b2d888be" PRIMARY KEY ("id"))`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "specification"`);
	}
}
