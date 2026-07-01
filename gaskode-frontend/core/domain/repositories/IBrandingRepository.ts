import { Branding } from "../entities/Branding";

export interface IBrandingRepository {
  findAll(): Promise<Branding[]>;
  create(data: Omit<Branding, 'id'>): Promise<void>;
  update(id: number, data: Partial<Branding>): Promise<void>;
  delete(id: number): Promise<void>;
}