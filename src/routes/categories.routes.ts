import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "../modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "../modules/cars/useCases/importCategories/ImportCategoriesController";
import { listCategoriesController } from "../modules/cars/useCases/listCategories";

const categoriesRoutes = Router();

const upload = multer({
	dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();

categoriesRoutes.post("/", createCategoryController.handle);

categoriesRoutes.get("/", (req, res) => {
	return listCategoriesController.handle(req, res);
});

categoriesRoutes.post(
	"/import",
	upload.single("file"),
	importCategoryController.handle
);

// exportando a rota
export { categoriesRoutes };
