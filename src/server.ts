import express from "express";

import { categoriesRoutes } from "./routes/categories.routes";

const app = express();
app.use(express.json());
app.use("/categories", categoriesRoutes);

app.listen(80, () => console.log("Server rodando na porta 80"));
