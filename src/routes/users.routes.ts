// A router object is an isolated instance of middleware and routes.
// You can think of it as a “mini-application,”
// capable only of performing middleware and routing functions.
import { Router } from "express";

import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";

const usersRoutes = Router();
const createUserController = new CreateUserController();

usersRoutes.post("/", createUserController.handle);

export { usersRoutes };
