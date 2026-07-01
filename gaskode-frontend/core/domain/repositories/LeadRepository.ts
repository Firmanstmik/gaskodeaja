import { Lead, CreateLeadDTO, UpdateLeadDTO, UpdateLeadStatusDTO } from "../entities/Lead";

export interface LeadRepository {
  getAll(): Promise<Lead[]>;
  getById(id: number): Promise<Lead>;
  create(data: CreateLeadDTO): Promise<Lead>;
  update(id: number, data: UpdateLeadDTO): Promise<Lead>;
  updateStatus(id: number, data: UpdateLeadStatusDTO): Promise<Lead>;
  delete(id: number): Promise<void>;
}