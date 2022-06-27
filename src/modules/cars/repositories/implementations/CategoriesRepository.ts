/* eslint-disable no-use-before-define */
import { Category } from "../../model/Category";
import {
	ICategoriesRepository,
	ICreateCategoryDTO,
} from "../ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
	// array que atuará como uma tabela do banco de dados
	// esse atributo será um array de category

	private static INSTANCE: CategoriesRepository;

	private categories: Category[];

	private constructor() {
		this.categories = [];
	}

	public static getInstance(): CategoriesRepository {
		if (!CategoriesRepository.INSTANCE) {
			CategoriesRepository.INSTANCE = new CategoriesRepository();
		}
		return CategoriesRepository.INSTANCE;
	}

	// método responsável por fazer o insert de uma nova categoria
	create({ name, description }: ICreateCategoryDTO): void {
		const category = new Category();
		/*
    	Jeito ruim de atribuir valores às propriedades do objeto:
    	category.name = name;
    	category.description = description;
    	category.created_at = new Date();
    	*/
		// Jeito bom de fazer a mesma coisa:
		Object.assign(category, {
			name,
			description,
			created_at: new Date(),
		});

		this.categories.push(category);
	}

	// método responsável por retornar uma lista com as categorias
	list(): Category[] {
		return this.categories;
	}

	findByName(name: string): Category | undefined {
		const category = this.categories.find((category) => category.name === name);
		return category;
	}
}

export { CategoriesRepository };
