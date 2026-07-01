import { ContactMe } from "../../domain/entities/ContactMe";
import { IContactMeRepository } from "../../domain/repositories/IContactMeRepository";

export class ManageContactMe {
  constructor(private repository: IContactMeRepository) {}

  async executeGetAll(): Promise<ContactMe[]> {
    return await this.repository.getAll();
  }

  async executeCreate(data: Omit<ContactMe, 'id'>): Promise<ContactMe> {
    if (!data.label || !data.value) throw new Error("Label dan Value wajib diisi");
    return await this.repository.create(data);
  }

  async executeUpdate(id: number, data: Partial<ContactMe>): Promise<void> {
    return await this.repository.update(id, data);
  }

  async executeDelete(id: number): Promise<void> {
    return await this.repository.delete(id);
  }
}