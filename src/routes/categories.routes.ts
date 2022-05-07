import { Router } from "express";

// import { Category } from "../model/Category";
import { CategoriesRepository } from "../modules/cars/repositories/CategoriesRepository";
import { CreateCategoryService } from "../modules/cars/services/CreateCategoryService";

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();
// Rotas servem para receber a requisição, chamar um serviço e retornar a informação
// SÓ ISSO
categoriesRoutes.post("/", (req, res) => {
	const { name, description } = req.body;
	const createCategoryService = new CreateCategoryService(
		categoriesRepository
	);
	createCategoryService.execute({ name, description });
	return res.status(201).send();
});

categoriesRoutes.get("/", (req, res) => {
	const categories = categoriesRepository.list();
	return res.json(categories);
});

// exportando a rota
export { categoriesRoutes };
