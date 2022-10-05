import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "../../dtos/ICreateUserDto";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
export class CreateUserUseCase {
	constructor(
		@inject("UsersRepository") private usersRepository: IUsersRepository
	) {}

	async execute({ name, email, password, driver_license }: ICreateUserDTO) {
		await this.usersRepository.create({
			name,
			driver_license,
			email,
			password,
		});
	}
}
