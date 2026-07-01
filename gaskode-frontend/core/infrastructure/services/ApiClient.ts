import { SessionManager } from "./SessionManager";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8006/api";

export const apiClient = async (endpoint: string, options: RequestInit = {}) => {
  const token = SessionManager.getToken();
  const headers = new Headers(options.headers);

  // OTOMATISASI: Jika body bukan FormData, baru set JSON
  if (!(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }
  
  headers.set('Accept', 'application/json');

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // Handle jika token expired (401)
  if (response.status === 401) {
    SessionManager.clearSession();
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  }

  return response;
};