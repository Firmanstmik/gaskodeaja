import { LeadRepository } from "../../domain/repositories/LeadRepository";
import { CreateLeadDTO, UpdateLeadDTO, LeadStatus } from "../../domain/entities/Lead";

export class LeadUseCase {
  constructor(private repository: LeadRepository) {}

  async fetchAllLeads() {
    return this.repository.getAll();
  }

  async submitLead(data: CreateLeadDTO | UpdateLeadDTO, id?: number) {
    if (id) {
      return this.repository.update(id, data as UpdateLeadDTO);
    }
    return this.repository.create(data as CreateLeadDTO);
  }

  async patchStatus(id: number, status: LeadStatus) {
    return this.repository.updateStatus(id, { status });
  }

  async removeLead(id: number) {
    return this.repository.delete(id);
  }
}