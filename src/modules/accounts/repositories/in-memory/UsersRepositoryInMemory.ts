import { randomUUID } from "crypto";

import { User } from "../../../entities/User";
import { ICreateUserDTO } from "../../dtos/ICreateUserDto";
import { IUsersRepository } from "../IUsersRepository";

export class UsersRepositoryInMemory implements IUsersRepository {
	users: User[] = [];
	async create(data: ICreateUserDTO): Promise<void> {
		const user = new User();
		Object.assign(user, { id: randomUUID(), ...data });
		this.users.push(user);
	}
	async findByEmail(email: string): Promise<User> {
		return this.users.find((user) => user.email === email);
	}
	async findById(id: string): Promise<User> {
		return this.users.find((user) => user.id === id);
	}
}
