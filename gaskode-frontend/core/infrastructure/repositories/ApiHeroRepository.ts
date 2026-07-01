import { Hero } from "../../domain/entities/Hero";
import { HeroRepository } from "../../domain/repositories/HeroRepository";
import { apiClient } from "../services/ApiClient";

export class ApiHeroRepository implements HeroRepository {
  private readonly path = "/hero";

  async getAll(): Promise<Hero[]> {
    const res = await apiClient(`${this.path}/all`, { cache: "no-store" });
    const result = await res.json();
    return result.data ?? result;
  }

  async getActive(): Promise<Hero> {
    const res = await apiClient(`${this.path}/active`);
    const result = await res.json();
    return result.data ?? result;
  }

  async create(data: FormData): Promise<Hero> {
    const res = await apiClient(this.path, {
      method: "POST",
      body: data,
      headers: {},
    });
    const result = await res.json();
    return result.data ?? result;
  }

  async update(id: number, data: FormData): Promise<Hero> {
    data.append("_method", "PUT");
    
    const res = await apiClient(`${this.path}/${id}`, {
      method: "POST",
      body: data,
      headers: {},
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