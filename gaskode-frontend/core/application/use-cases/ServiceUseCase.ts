import { ServiceRepository } from "../../domain/repositories/ServiceRepository";
import { CreateServiceDTO } from "../../domain/entities/Service";

export class ServiceUseCase {
  constructor(private repository: ServiceRepository) {}

  async getAllServices() {
    return this.repository.getAll();
  }

  async createService(data: CreateServiceDTO) {
    // Anda bisa menambahkan logika tambahan di sini (misal: validasi title)
    return this.repository.create(data);
  }

  async updateService(id: number, data: CreateServiceDTO) {
    return this.repository.update(id, data);
  }

  async deleteService(id: number) {
    return this.repository.delete(id);
  }
}