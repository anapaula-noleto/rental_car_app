import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { getRepository, Repository } from "typeorm";
import { Car } from "../../entities/Car";

export class CarsRepository implements ICarsRepository {
	private repository: Repository<Car>;

	constructor() {
		this.repository = getRepository(Car);
	}
	async create(data: ICreateCarDTO): Promise<Car> {
		const car = this.repository.create(data);
		await this.repository.save(car);
		return car;
	}
	async findByLicensePlate(license_plate: string): Promise<Car> {
		const car = await this.repository.findOne({ where: { license_plate } });
		return car;
	}
	async findAvailable(
		brand?: string,
		category_id?: string,
		name?: string
	): Promise<Car[]> {
		throw new Error("Method not implemented.");
	}
	findById(id: string): Promise<Car> {
		throw new Error("Method not implemented.");
	}
	updateAvailable(id: string, available: boolean): Promise<void> {
		throw new Error("Method not implemented.");
	}
}
