import { Category } from "../model/Category";

// DTO => data transfer object.
// Um objeto responsável por fazer a tranferência de dados entre diferentes classes.
interface ICreateCategoryDTO {
	name: string;
	description: string;
}

interface ICategoriesRepository {
	findByName(name: string): Category;
	list(): Category[];
	create({ name, description }: ICreateCategoryDTO): void;
}

export { ICategoriesRepository, ICreateCategoryDTO };
