// A router object is an isolated instance of middleware and routes.
// You can think of it as a “mini-application,”
// capable only of performing middleware and routing functions.
import { Router } from "express";
import multer from "multer";

import uploadConfig from "../config/upload";
import { ensureAuthentication } from "../middlewares/ensureAuthentication";
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";
import { UpdateAvatarController } from "../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateAvatarController();

usersRoutes.post("/", createUserController.handle);
usersRoutes.patch(
	"/avatar",
	ensureAuthentication,
	uploadAvatar.single("avatar"),
	updateUserAvatarController.handle
);

export { usersRoutes };
