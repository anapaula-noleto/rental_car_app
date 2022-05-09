import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
	name: string;
	description: string;
}
/**
 * [x]- Definir o tipo de retorno
 * [x]- Alterar o retorno do erro
 * [x]- Acessar o repositório
 */

class CreateCategoryUseCase {
	// inversão de dependência -> receber o repositório de dentro do construtor
	private categoriesRepository: ICategoriesRepository;
	constructor(categoriesRepository: ICategoriesRepository) {
		this.categoriesRepository = categoriesRepository;
	}
	execute({ name, description }: IRequest): void {
		const categoryAlreadyExists =
			this.categoriesRepository.findByName(name);
		if (categoryAlreadyExists) {
			throw new Error("Category already exists!");
		}
		this.categoriesRepository.create({ name, description });
	}
}

export { CreateCategoryUseCase };
