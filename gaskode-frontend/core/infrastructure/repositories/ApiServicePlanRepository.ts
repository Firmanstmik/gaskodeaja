import { ServicePlan, CreateServicePlanDTO, UpdateServicePlanDTO } from "../../domain/entities/ServicePlan";
import { ServicePlanRepository } from "../../domain/repositories/ServicePlanRepository";
import { apiClient } from "../services/ApiClient";

export class ApiServicePlanRepository implements ServicePlanRepository {
  private readonly path = '/service-plans';

  async getAll(): Promise<ServicePlan[]> {
    const res = await apiClient(this.path);
    return res.json();
  }

  async getById(id: number): Promise<ServicePlan> {
    const res = await apiClient(`${this.path}/${id}`);
    return res.json();
  }

  async getByService(serviceId: number): Promise<ServicePlan[]> {
    const res = await apiClient(`${this.path}/service/${serviceId}`);
    return res.json();
  }

  async create(data: CreateServicePlanDTO): Promise<ServicePlan> {
    const res = await apiClient(this.path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  }

  async update(id: number, data: UpdateServicePlanDTO): Promise<ServicePlan> {
    const res = await apiClient(`${this.path}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  }

  async delete(id: number): Promise<void> {
    await apiClient(`${this.path}/${id}`, { method: "DELETE" });
  }
}