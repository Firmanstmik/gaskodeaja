import { ContactMe } from "../entities/ContactMe";

export interface IContactMeRepository {
  getAll(): Promise<ContactMe[]>;
  getById(id: number): Promise<ContactMe>;
  create(contact: Omit<ContactMe, 'id'>): Promise<ContactMe>;
  update(id: number, contact: Partial<ContactMe>): Promise<void>;
  delete(id: number): Promise<void>;
}