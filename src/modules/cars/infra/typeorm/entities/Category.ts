import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
} from "typeorm";

@Entity("categories")
class Category {
	// a interrogação avisa que o parâmetro é opcional

	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	name: string;

	@Column()
	description: string;

	@CreateDateColumn()
	created_at: Date;
}

export { Category };
