import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateAvatarUseCase } from "./UpdateUserAvatarUseCase";

export class UpdateAvatarController {
	async handle(req: Request, res: Response): Promise<Response> {
		const { id } = req.user;

		const avatar_file = req.file.filename;

		const updateUserAvatarUseCase = container.resolve(UpdateAvatarUseCase);

		await updateUserAvatarUseCase.execute({ user_id: id, avatar_file });

		return res.status(204).send();
	}
}
