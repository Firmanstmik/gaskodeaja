import { Portfolio } from "../../domain/entities/Portfolio";
import { apiClient } from "../services/ApiClient";

export class ApiPortfolioRepository {
  private readonly path = "/portfolios";

  async getAll(): Promise<Portfolio[]> {
    const res = await apiClient(this.path, { cache: "no-store" });
    const result = await res.json();
    return result.data ?? result;
  }

  async create(data: FormData): Promise<Portfolio> {
    // Biarkan browser menentukan Content-Type (multipart/form-data) secara otomatis
    const res = await apiClient(this.path, {
      method: "POST",
      body: data,
    });
    const result = await res.json();
    return result.data ?? result;
  }

  async update(id: number, data: FormData): Promise<Portfolio> {
    // Spoofing method PUT karena menggunakan FormData
    data.append("_method", "PUT");
    
    const res = await apiClient(`${this.path}/${id}`, {
      method: "POST",
      body: data,
    });
    const result = await res.json();
    return result.data ?? result;
  }

  async delete(id: number): Promise<void> {
    await apiClient(`${this.path}/${id}`, { 
      method: "DELETE" 
    });
  }
}