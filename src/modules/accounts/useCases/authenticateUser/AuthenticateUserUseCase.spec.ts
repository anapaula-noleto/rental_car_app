import { AppError } from "../../../../errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDto";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
	beforeEach(() => {
		usersRepositoryInMemory = new UsersRepositoryInMemory();
		authenticateUserUseCase = new AuthenticateUserUseCase(
			usersRepositoryInMemory
		);
		createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
	});

	it("should be able to authenticate an user", async () => {
		const user: ICreateUserDTO = {
			driver_license: "0000112213",
			email: "test@test.com",
			name: "teste",
			password: "String123",
		};

		await createUserUseCase.execute(user);

		const response = await authenticateUserUseCase.execute({
			email: user.email,
			password: user.password,
		});

		expect(response).toHaveProperty("token");
	});

	it("should not authenticate an nonexisting user", () => {
		expect(async () => {
			await authenticateUserUseCase.execute({
				email: "loremipsum@teste.com",
				password: "String123",
			});
		}).rejects.toBeInstanceOf(AppError);
	});

	it("should not authenticate with an incorrect password", async () => {
		const user: ICreateUserDTO = {
			driver_license: "0000112213",
			email: "test@test.com",
			name: "User test error",
			password: "String123",
		};

		await createUserUseCase.execute(user);

		const response = authenticateUserUseCase.execute({
			email: user.email,
			password: "WrongPassword",
		});

		expect(response).rejects.toBeInstanceOf(AppError);
	});
});
