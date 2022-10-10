import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
	email: string;
	password: string;
}

interface IResponse {
	user: {
		name: string;
		email: string;
	};
	token: string;
}

@injectable()
export class AuthenticateUserUseCase {
	constructor(
		@inject("UsersRepository") private usersRepository: IUsersRepository
	) {}

	async execute({ email, password }: IRequest): Promise<IResponse> {
		// usuario existe
		const user = await this.usersRepository.findByEmail(email);

		if (!user) {
			throw new Error("Email or password incorrect");
		}

		// senha está correta
		const passwordMatch = await compare(password, user.password);

		if (!passwordMatch) {
			throw new Error("Email or password incorrect");
		}

		// gerar json webtoken

		const token = sign({}, "9e9fa155eabe721cc449ddd0501b22bb44fffc5a", {
			subject: user.id,
			expiresIn: "1d",
		});

		const tokenReturn: IResponse = {
			user: {
				name: user.name,
				email: user.email,
			},
			token,
		};

		return tokenReturn;
	}
}
