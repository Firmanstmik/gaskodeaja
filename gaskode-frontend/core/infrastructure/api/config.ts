// export const API_CONFIG = {
//   BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8006/api",
//   HEADERS: {
//     "Accept": "application/json",
//   },
// };

// // Helper untuk fetch agar tidak tulis ulang Base URL
// export const apiFetch = async (endpoint: string, options?: RequestInit) => {
//   const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
//     ...options,
//     headers: {
//       ...API_CONFIG.HEADERS,
//       ...options?.headers,
//     },
//   });

//   if (!response.ok) {
//     const errorData = await response.json().catch(() => ({}));
//     throw new Error(errorData.message || "Terjadi kesalahan pada server");
//   }

//   return response.json();
// };