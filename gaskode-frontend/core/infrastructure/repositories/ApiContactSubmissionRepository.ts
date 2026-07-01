import { ContactSubmission, SubmissionStatus } from "../../domain/entities/ContactSubmission";
import { IContactSubmissionRepository } from "../../domain/repositories/IContactSubmissionRepository";
import { apiClient } from "../services/ApiClient";

export class ApiContactSubmissionRepository implements IContactSubmissionRepository {
    private readonly path = '/submissions';

    async getAll(): Promise<ContactSubmission[]> {
        const res = await apiClient(this.path, { cache: 'no-store' });
        if (!res.ok) throw new Error('Gagal mengambil data submission');
        const response = await res.json();

        // Mapping snake_case dari Laravel ke camelCase TypeScript
        return response.data.map((item: any) => ({
            id: item.id,
            name: item.name,
            whatsappNumber: item.whatsapp_number,
            message: item.message,
            status: item.status,
            createdAt: item.created_at
        }));
    }
    async create(data: ContactSubmission): Promise<void> {
        const res = await apiClient(this.path, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: data.name,
                whatsapp_number: data.whatsappNumber, // Convert ke snake_case untuk Laravel
                message: data.message,
                status: data.status || 'pending'
            }),
        });

        if (!res.ok) throw new Error('Gagal menyimpan pesan baru');
    }

    async updateStatus(id: number, status: SubmissionStatus): Promise<void> {
        const res = await apiClient(`${this.path}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status }),
        });

        if (!res.ok) throw new Error('Gagal memperbarui status');
    }

    async delete(id: number): Promise<void> {
        const res = await apiClient(`${this.path}/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Gagal menghapus data');
    }
}