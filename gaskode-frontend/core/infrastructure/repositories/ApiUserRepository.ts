import { User, CreateUserDTO, UpdateUserDTO } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { apiClient } from "../services/ApiClient";

export class ApiUserRepository implements UserRepository {
  private readonly path = '/users';

  async getAll(): Promise<User[]> {
    const res = await apiClient(this.path);
    const result = await res.json();
    return result.data ?? result;
  }

  async getById(id: number): Promise<User> {
    const res = await apiClient(`${this.path}/${id}`);
    const result = await res.json();
    return result.data ?? result;
  }

  async create(data: CreateUserDTO): Promise<User> {
    const res = await apiClient(this.path, {
      method: "POST",
      body: JSON.stringify(data),
    });
    const result = await res.json();
    return result.data ?? result;
  }

  async update(id: number, data: UpdateUserDTO): Promise<User> {
    const res = await apiClient(`${this.path}/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    const result = await res.json();
    return result.data ?? result;
  }

  async delete(id: number): Promise<void> {
    await apiClient(`${this.path}/${id}`, { method: "DELETE" });
  }
}