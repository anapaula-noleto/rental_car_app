// importando o fs - file system module
import { parse as csvParse } from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IImportCategory {
	name: string;
	description: string;
}

@injectable()
class ImportCategoriesUseCase {
	constructor(
		@inject("CategoriesRepository")
		private categoriesRepository: ICategoriesRepository
	) {}

	loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
		return new Promise((resolve, reject) => {
			const stream = fs.createReadStream(file.path);
			const categories: IImportCategory[] = [];

			// pipe -> pega o que está dentro de stream e coloca em outro lugar
			// initialize the parser
			const parseFile = csvParse();
			stream.pipe(parseFile);

			parseFile
				.on("end", () => {
					fs.promises.unlink(file.path);
					resolve(categories);
				})
				.on("data", async (line) => {
					const [name, description] = line;
					categories.push({
						name,
						description,
					});
				})
				.on("error", (err) => {
					reject(err);
				});
		});
	}

	async execute(file: Express.Multer.File): Promise<void> {
		const categories = await this.loadCategories(file);
		categories.map(async (category) => {
			const { name, description } = category;

			const categoryExists = this.categoriesRepository.findByName(name);
			if (!categoryExists) {
				this.categoriesRepository.create({ name, description });
			}
		});
	}
}

export { ImportCategoriesUseCase };
