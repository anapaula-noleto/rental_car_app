/* eslint-disable no-use-before-define */
import { getRepository, Repository } from "typeorm";

import { Category } from "../../../entities/Category";
import {
	ICategoriesRepository,
	ICreateCategoryDTO,
} from "../ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
	private repository: Repository<Category>;

	private static INSTANCE: CategoriesRepository;

	constructor() {
		this.repository = getRepository(Category);
	}

	// método responsável por fazer o insert de uma nova categoria
	async create({ name, description }: ICreateCategoryDTO): Promise<void> {
		const category = this.repository.create({
			description,
			name,
		});

		await this.repository.save(category);
	}

	// método responsável por retornar uma lista com as categorias
	async list(): Promise<Category[]> {
		const categories = this.repository.find();
		return categories;
	}

	async findByName(name: string): Promise<Category> {
		const category = await this.repository.findOne({ where: { name } });
		return category;
	}
}

export { CategoriesRepository };
