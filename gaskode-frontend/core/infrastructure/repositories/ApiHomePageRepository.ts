// src/core/infrastructure/repositories/ApiHomeRepository.ts
import { HomeData } from "@/core/domain/entities/HomePage";
import { apiClient } from "../services/ApiClient";

export class ApiHomeRepository {
  private readonly path = '/public/home';

  async getHomeData(): Promise<HomeData> {
    const res = await apiClient(this.path, {
      next: { revalidate: 3600 }
    });
    
    if (!res.ok) throw new Error("Gagal mengambil data landing page");
    
    const result = await res.json();
    return result.data || result;
  }
}