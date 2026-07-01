import { CategoryRepository } from "../../domain/repositories/CategoryRepository";
import { CreateCategoryDTO } from "../../domain/entities/Category";

export class CategoryUseCase {
  constructor(private repository: CategoryRepository) {}

  async executeGetAll() {
    return this.repository.getAll();
  }

  async executeCreate(name: string) {
    const dto: CreateCategoryDTO = { name };
    return this.repository.create(dto);
  }

  async executeDelete(id: number) {
    return this.repository.delete(id);
  }
  
  // Update dan GetById bisa ditambahkan di sini
}