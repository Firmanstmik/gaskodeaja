import { VisiMisi } from "@/core/domain/entities/VisiMisi";
import { IVisiMisiRepository } from "@/core/domain/repositories/IVisiMisiRepository";

export class ApiVisiMisiRepository implements IVisiMisiRepository {
  private readonly path = '/visi-misi';

  async findAll(): Promise<VisiMisi[]> {
    const res = await fetch(this.path);
    const result = await res.json();
    return result.data || result;
  }

  async create(data: Omit<VisiMisi, "id">): Promise<void> {
    await fetch(this.path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  }

  async update(id: number, data: Partial<VisiMisi>): Promise<void> {
    await fetch(`${this.path}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  }

  async delete(id: number): Promise<void> {
    await fetch(`${this.path}/${id}`, { method: "DELETE" });
  }
}