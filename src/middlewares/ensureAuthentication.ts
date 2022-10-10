import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
	sub: string;
}

export async function ensureAuthentication(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const authHeader = req.headers.authorization;
	if (!authHeader) {
		throw new Error("Token missing");
	}

	const [, token] = authHeader.split(" ");

	try {
		const { sub: user_id } = verify(
			token,
			"9e9fa155eabe721cc449ddd0501b22bb44fffc5a"
		) as IPayload;
		const usersRepository = new UsersRepository();
		const userExists = usersRepository.findById(user_id);
		if (!userExists) {
			throw new Error("User does not exist.");
		}
		next();
	} catch {
		throw new Error("Invalid token.");
	}
}
