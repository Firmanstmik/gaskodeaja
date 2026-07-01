import { Qna } from "@/core/domain/entities/Qna";
import { IQnaRepository } from "@/core/domain/repositories/IQnaRepository";
import { apiClient } from "../services/ApiClient";

export class ApiQnaRepository implements IQnaRepository {
  private path = '/faqs';

  async findAll(): Promise<Qna[]> {
  const res = await apiClient(this.path);
  const result = await res.json();
  return result; 
}

  async create(data: Omit<Qna, "id">): Promise<void> {
    await apiClient(this.path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  }

  async delete(id: number): Promise<void> {
    await apiClient(`${this.path}/${id}`, { method: "DELETE" });
  }

  async findById(id: number): Promise<Qna> {
    const res = await apiClient(`${this.path}/${id}`);
    return (await res.json()).data;
  }

  async update(id: number, data: Partial<Qna>): Promise<void> {
    await apiClient(`${this.path}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  }
}