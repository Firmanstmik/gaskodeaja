import { CaraKerja } from "@/core/domain/entities/CaraKerja";
import { ICaraKerjaRepository } from "@/core/domain/repositories/ICaraKerjaRepository";
import { apiClient } from "../services/ApiClient";

export class ApiCaraKerjaRepository implements ICaraKerjaRepository {
  private readonly path = '/cara-kerja';

  async findAll(): Promise<CaraKerja[]> {
    const res = await apiClient(this.path);
    const result = await res.json();
    return result.data || result;
  }

  async create(data: Omit<CaraKerja, "id">): Promise<void> {
    await apiClient(this.path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  }

  async update(id: number, data: Partial<CaraKerja>): Promise<void> {
    await apiClient(`${this.path}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  }

  async delete(id: number): Promise<void> {
    await apiClient(`${this.path}/${id}`, { method: "DELETE" });
  }
}