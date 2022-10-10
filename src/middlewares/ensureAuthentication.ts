import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../errors/AppError";
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
		throw new AppError("Token missing", 401);
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
			throw new AppError("User does not exist.", 401);
		}
		next();
	} catch {
		throw new AppError("Invalid token.", 401);
	}
}
