import { container } from "tsyringe";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/implementations/CarsRepository";
import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/implementations/CategoriesRepository";
import { SpecificationsRepository } from "@modules/cars/infra/typeorm/repositories/implementations/SpecificationsRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";

container.registerSingleton<ICategoriesRepository>(
	"CategoriesRepository",
	CategoriesRepository
);
container.registerSingleton<ISpecificationsRepository>(
	"SpecificationRepository",
	SpecificationsRepository
);
container.registerSingleton<IUsersRepository>(
	"UsersRepository",
	UsersRepository
);
container.registerSingleton<ICarsRepository>("CarsRepository", CarsRepository);
