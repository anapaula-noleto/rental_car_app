import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
} from "typeorm";

@Entity("users")
export class User {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	name: string;

	@Column({ unique: true })
	username: string;

	@Column()
	password: string;

	@Column({ unique: true })
	email: string;

	@Column()
	driver_license: string;

	@Column("boolean", { default: false, name: "is_admin" })
	isAdmin: boolean;

	@Column()
	avatar: string;

	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;
}
