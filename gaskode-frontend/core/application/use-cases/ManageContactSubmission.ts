import { IContactSubmissionRepository } from "../../domain/repositories/IContactSubmissionRepository";
import { ContactSubmission, SubmissionStatus } from "../../domain/entities/ContactSubmission";

export class ManageContactSubmission {
  constructor(private repository: IContactSubmissionRepository) {}

  async executeGetAll() {
    return await this.repository.getAll();
  }

  // Tambahkan ini untuk handle simpan data
  async executeCreate(data: ContactSubmission) {
    return await this.repository.create(data);
  }

  async executeChangeStatus(id: number, status: SubmissionStatus) {
    return await this.repository.updateStatus(id, status);
  }

  async executeDelete(id: number) {
    return await this.repository.delete(id);
  }
}