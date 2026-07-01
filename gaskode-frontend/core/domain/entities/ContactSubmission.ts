export type SubmissionStatus = 'pending' | 'processed' | 'archived';

export interface ContactSubmission {
  id?: number;
  name: string;
  whatsappNumber: string;
  message?: string;
  status?: SubmissionStatus;
  createdAt?: string;
}