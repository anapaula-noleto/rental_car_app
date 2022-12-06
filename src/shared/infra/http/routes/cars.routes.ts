import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ensureAuthentication } from "@shared/infra/http/middlewares/ensureAuthentication";

const carsRoutes = Router();

const createCarController = new CreateCarController();

carsRoutes.use(ensureAuthentication);
carsRoutes.post("/", createCarController.handle);

export { carsRoutes };
