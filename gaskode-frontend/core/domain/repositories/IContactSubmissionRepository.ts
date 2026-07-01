import { ContactSubmission, SubmissionStatus } from "../entities/ContactSubmission";

export interface IContactSubmissionRepository {
  getAll(): Promise<ContactSubmission[]>;
  create(data: ContactSubmission): Promise<void>;
  updateStatus(id: number, status: SubmissionStatus): Promise<void>;
  delete(id: number): Promise<void>;
}