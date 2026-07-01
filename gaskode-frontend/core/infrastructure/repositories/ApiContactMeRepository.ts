import { ContactMe } from "../../domain/entities/ContactMe";
import { IContactMeRepository } from "../../domain/repositories/IContactMeRepository";
import { apiClient } from "../services/ApiClient";

export class ApiContactMeRepository implements IContactMeRepository {
  // Gunakan path endpoint saja
  private readonly path = '/contact-mes';

  async getAll(): Promise<ContactMe[]> {
    const res = await apiClient(this.path, { cache: 'no-store' });
    const result = await res.json();
    return result.data ?? result;
  }

  async getById(id: number): Promise<ContactMe> {
    const res = await apiClient(`${this.path}/${id}`);
    const result = await res.json();
    return result.data ?? result;
  }

  async create(contact: Omit<ContactMe, 'id'>): Promise<ContactMe> {
    const res = await apiClient(this.path, {
      method: 'POST',
      body: JSON.stringify(contact),
    });
    const result = await res.json();
    return result.data ?? result;
  }

  async update(id: number, contact: Partial<ContactMe>): Promise<void> {
    await apiClient(`${this.path}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(contact),
    });
    // Biasanya update tidak perlu return data jika tipenya Promise<void>
  }

  async delete(id: number): Promise<void> {
    await apiClient(`${this.path}/${id}`, { 
        method: 'DELETE' 
    });
  }
}