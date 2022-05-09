import { SpecificationRepository } from "../../repositories/implementations/SpecificationsRepository";
import { CreateSpecificationController } from "./CreateSpecificationController";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

const speficicationRepository = new SpecificationRepository();

const createSpecificationUseCase = new CreateSpecificationUseCase(
	speficicationRepository
);

const createSpecificationController = new CreateSpecificationController(
	createSpecificationUseCase
);

export { createSpecificationController };
