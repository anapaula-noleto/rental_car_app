import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import "reflect-metadata";
import { serve, setup } from "swagger-ui-express";
import * as YAML from "yamljs";

import "@shared/container";
import { AppError } from "@shared/errors/AppError";
import "@shared/infra/typeorm";

import { router } from "./routes";

const app = express();

const port = 3333;
// o nome da rota que vai ficar a documentação será api-docs

app.use("/api-docs", serve, setup(YAML.load("src/swagger.yml")));

app.use(express.json());

app.use(router);

// em middlewares de erro o erro sempre vêm primeiro
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	if (err instanceof AppError) {
		return res.status(err.statusCode).json({
			message: err.message,
		});
	}

	return res.status(500).json({
		status: "error",
		message: `Internal server error - ${err.message}`,
	});
});

app.listen(port, () => console.log(`Server running at ${port}`));
