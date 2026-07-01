import { Service, CreateServiceDTO } from "../../domain/entities/Service";
import { ServiceRepository } from "../../domain/repositories/ServiceRepository";
import { apiClient } from "../services/ApiClient";


export class ApiServiceRepository implements ServiceRepository {
  private readonly path = '/services';
  async getAll(): Promise<Service[]> {
    const res = await apiClient(this.path);
    return res.json();
  }

  async getById(id: number): Promise<Service> {
    const res = await apiClient(`${this.path}/${id}`);
    return res.json();
  }

  async create(data: CreateServiceDTO): Promise<Service> {
    const res = await apiClient(this.path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  }

  async update(id: number, data: CreateServiceDTO): Promise<Service> {
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