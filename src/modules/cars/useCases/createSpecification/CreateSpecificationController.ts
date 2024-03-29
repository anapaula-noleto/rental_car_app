import { Response, Request } from "express";
import { container } from "tsyringe";

import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

class CreateSpecificationController {
	async handle(req: Request, res: Response) {
		const { name, description } = req.body;

		const createSpecificationUseCase = container.resolve(
			CreateSpecificationUseCase
		);

		await createSpecificationUseCase.execute({ name, description });

		return res.status(201).send();
	}
}

export { CreateSpecificationController };
