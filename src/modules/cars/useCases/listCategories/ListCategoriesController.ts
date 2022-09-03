import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

class ListCategoriesController {
	handle(req: Request, res: Response) {
		const listCategoryUseCase = container.resolve(ListCategoriesUseCase);
		const allCategories = listCategoryUseCase.execute();
		return res.json(allCategories);
	}
}

export { ListCategoriesController };
