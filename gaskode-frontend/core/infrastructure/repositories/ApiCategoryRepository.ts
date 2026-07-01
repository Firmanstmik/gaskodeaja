import { Category, CreateCategoryDTO } from "../../domain/entities/Category";
import { CategoryRepository } from "../../domain/repositories/CategoryRepository";
import { apiClient } from "../services/ApiClient";


export class ApiCategoryRepository implements CategoryRepository {
  private readonly path = '/categories';
  async getAll(): Promise<Category[]> {
    const res = await apiClient(this.path);
    return res.json();
  }

  async getById(id: number): Promise<Category> {
    const res = await apiClient(`${this.path}/${id}`);
    return res.json();
  }

  async create(data: CreateCategoryDTO): Promise<Category> {
    const res = await apiClient(this.path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  }

  async update(id: number, data: CreateCategoryDTO): Promise<Category> {
    const res = await apiClient(`${this.path}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  }

  async delete(id: number): Promise<void> {
    await apiClient(`${this.path}/${id}`, { method: 'DELETE' });
  }
}