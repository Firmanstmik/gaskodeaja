import { Lead, CreateLeadDTO, UpdateLeadDTO, UpdateLeadStatusDTO } from "../../domain/entities/Lead";
import { LeadRepository } from "../../domain/repositories/LeadRepository";
import { apiClient } from "../services/ApiClient";

export class ApiLeadRepository implements LeadRepository {
  private readonly path = '/leads';

  async getAll(): Promise<Lead[]> {
    const res = await apiClient(this.path);
    return res.json();
  }

  async getById(id: number): Promise<Lead> {
    const res = await apiClient(`${this.path}/${id}`);
    return res.json();
  }

  async create(data: CreateLeadDTO): Promise<Lead> {
    const res = await apiClient(this.path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  }

  async update(id: number, data: UpdateLeadDTO): Promise<Lead> {
    const res = await apiClient(`${this.path}/${id}`, {
      method: "PUT", // Sesuai rute Laravel Route::put
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  }

  async updateStatus(id: number, data: UpdateLeadStatusDTO): Promise<Lead> {
    const res = await apiClient(`${this.path}/${id}/status`, {
      method: "PATCH", // Sesuai rute Laravel Route::patch
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  }

  async delete(id: number): Promise<void> {
    await apiClient(`${this.path}/${id}`, { method: "DELETE" });
  }
}