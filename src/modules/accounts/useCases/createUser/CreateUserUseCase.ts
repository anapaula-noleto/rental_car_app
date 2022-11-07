import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDto";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
export class CreateUserUseCase {
	constructor(
		@inject("UsersRepository") private usersRepository: IUsersRepository
	) {}

	async execute({
		name,
		email,
		password,
		driver_license,
	}: ICreateUserDTO): Promise<void> {
		const passwordHash = await hash(password, 8);

		const userAlreadyExists = await this.usersRepository.findByEmail(email);
		if (userAlreadyExists) {
			throw new AppError("User already exists");
		}

		await this.usersRepository.create({
			name,
			driver_license,
			email,
			password: passwordHash,
		});
	}
}
