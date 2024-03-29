import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

export interface IRequest {
	name: string;
	description: string;
}
@injectable()
class CreateCategoryUseCase {
	// inversão de dependência -> receber o repositório de dentro do construtor
	constructor(
		@inject("CategoriesRepository")
		private categoriesRepository: ICategoriesRepository
	) {}
	async execute({ name, description }: IRequest): Promise<void> {
		const categoryAlreadyExists = await this.categoriesRepository.findByName(
			name
		);
		if (categoryAlreadyExists) {
			throw new AppError("Category already exists!");
		}
		this.categoriesRepository.create({ name, description });
	}
}

export { CreateCategoryUseCase };
