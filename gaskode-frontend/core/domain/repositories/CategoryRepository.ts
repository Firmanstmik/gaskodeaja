import { Category, CreateCategoryDTO } from "../entities/Category";

export interface CategoryRepository {
  getAll(): Promise<Category[]>;
  getById(id: number): Promise<Category>;
  create(data: CreateCategoryDTO): Promise<Category>;
  update(id: number, data: CreateCategoryDTO): Promise<Category>;
  delete(id: number): Promise<void>;
}