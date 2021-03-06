import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
	name: string;
	description: string;
}

class CreateSpecificationUseCase {
	constructor(private specificationsRepository: ISpecificationsRepository) {}

	execute({ name, description }: IRequest): void {
		const specificationAlreadyExists =
			this.specificationsRepository.findByName(name);
		if (specificationAlreadyExists) {
			throw new Error("Category already exists!");
		} else {
			this.specificationsRepository.create({
				name,
				description,
			});
		}
	}
}

export { CreateSpecificationUseCase };
