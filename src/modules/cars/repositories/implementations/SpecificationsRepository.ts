import { Specification } from "../../entities/Specification";
import {
	ISpecificationsRepository,
	ICreateSpecificationDTO,
} from "../ISpecificationsRepository";

class SpecificationRepository implements ISpecificationsRepository {
	private specifications: Specification[];

	constructor() {
		this.specifications = [];
	}

	findByName(name: string): Specification | undefined {
		const specification = this.specifications.find(
			(specification) => specification.name === name
		);
		return specification;
	}

	create({ name, description }: ICreateSpecificationDTO): void {
		const specification = new Specification();
		Object.assign(specification, {
			name,
			description,
			created_at: new Date(),
		});

		this.specifications.push(specification);
	}
}

export { SpecificationRepository };
