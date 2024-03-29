import { AppError } from "../../../../shared/errors/AppError";
import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase, IRequest } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create Category", () => {
	beforeEach(() => {
		categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
		createCategoryUseCase = new CreateCategoryUseCase(
			categoriesRepositoryInMemory
		);
	});

	it("should be able to create a new category", async () => {
		const category: IRequest = {
			name: "Category name test",
			description: "Category description test",
		};

		await createCategoryUseCase.execute(category);

		const categoryCreated = await categoriesRepositoryInMemory.findByName(
			category.name
		);
		expect(categoryCreated).toBeDefined();
	});

	it("should not create a category with a name that already exists", () => {
		const category: IRequest = {
			name: "Category name test",
			description: "Category description test",
		};

		expect(async () => {
			await createCategoryUseCase.execute(category);
			await createCategoryUseCase.execute(category);
		}).rejects.toBeInstanceOf(AppError);
	});
});
