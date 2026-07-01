import { Branding } from "@/core/domain/entities/Branding";
import { IBrandingRepository } from "@/core/domain/repositories/IBrandingRepository";
import { apiClient } from "../services/ApiClient";

export class ApiBrandingRepository implements IBrandingRepository {
  // Kita simpan path-nya saja sebagai string
  private readonly path = '/brandings';

  async findAll(): Promise<Branding[]> {
    // Gunakan apiClient, bukan fetch bawaan
    const res = await apiClient(this.path);
    const result = await res.json();
    
    // Sesuaikan dengan struktur response Laravel Anda (biasanya di dalam result.data)
    return result.data ?? result; 
  }

  async create(data: Omit<Branding, "id">): Promise<void> {
    await apiClient(this.path, {
      method: "POST",
      body: JSON.stringify(data),
      // Header Content-Type & Authorization sudah ditangani di dalam apiClient
    });
  }

  async update(id: number, data: Partial<Branding>): Promise<void> {
    await apiClient(`${this.path}/${id}`, {
      method: "PUT", // Atau "PATCH" sesuai route Laravel Anda
      body: JSON.stringify(data),
    });
  }

  async delete(id: number): Promise<void> {
    await apiClient(`${this.path}/${id}`, { 
      method: "DELETE" 
    });
  }
}