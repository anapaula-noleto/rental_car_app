import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
} from "typeorm";

@Entity("specifications")
class Specification {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	name: string;

	@Column()
	description: string;

	@CreateDateColumn()
	crated_at: Date;
}
export { Specification };
