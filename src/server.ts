import express from "express";
import swaggerUi from "swagger-ui-express";

import { router } from "./routes";
import swaggerFile from "./swagger.json";
import "./database";

const app = express();
const port = 3333;
// o nome da rota que vai ficar a documentação será api-docs

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(express.json());
app.use(router);
app.listen(port, () => console.log(`Server running at ${port}`));
