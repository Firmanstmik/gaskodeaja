import { Register } from "@/core/domain/entities/Register";
import { AuthResponse } from "../../domain/entities/Auth";
import { apiClient } from "../services/ApiClient";
import { SessionManager } from "../services/SessionManager";

export class ApiAuthRepository {
    private readonly path = '/auth';
    async login(credentials: any): Promise<AuthResponse> {
        const response = await apiClient(`${this.path}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        });
        const result = await response.json();

        if (result.status === 'success') {
            SessionManager.setSession(result.data.token, result.data.user, result.data.expires_in);
        }
        return result;
    }
    async register(data: Register): Promise<void> { // Return void karena tidak butuh data user/token di sini
        try {
            const res = await apiClient('/auth/register', {
                method: 'POST',
                body: JSON.stringify(data),
            });

            const result = (await res.json()) as {
                message?: string;
                errors?: Record<string, string[]>;
            };

            if (!res.ok) {
                const errorMessage = result.errors
                    ? Object.values(result.errors)[0][0]
                    : result.message || "Registrasi Gagal";

                throw new Error(errorMessage);
            }

        } catch (err: unknown) {
            if (err instanceof Error) {
                throw err;
            }
            throw new Error("Terjadi kesalahan sistem");
        }
    }

    async logout(): Promise<void> {
        const token = SessionManager.getToken();
        await apiClient(`${this.path}/logout`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });
        SessionManager.clearSession();
    }

    async getMe(): Promise<AuthResponse> {
        const response = await apiClient('/auth/me');
        return response.json();
    }
}