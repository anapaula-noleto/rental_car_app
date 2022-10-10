import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import { AppError } from "./errors/AppError";
import { router } from "./routes";
import swaggerFile from "./swagger.json";
import "./database";
import "./shared/container";

const app = express();

const port = 3333;
// o nome da rota que vai ficar a documentação será api-docs

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

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
