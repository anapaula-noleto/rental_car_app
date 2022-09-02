import { Category } from "../entities/Category";

// DTO => data transfer object.
// Um objeto responsável por fazer a transferência de dados entre diferentes classes.
interface ICreateCategoryDTO {
	name: string;
	description: string;
}

interface ICategoriesRepository {
	findByName(name: string): Promise<Category>;
	list(): Promise<Category[]>;
	create({ name, description }: ICreateCategoryDTO): Promise<void>;
}

export { ICategoriesRepository, ICreateCategoryDTO };
