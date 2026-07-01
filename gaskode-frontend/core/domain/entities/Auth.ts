export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

export interface AuthResponse {
  data: {
    user: User;
    token: string;
    token_type: string;
    expires_in: number;
  };
  message: string;
  status: 'success' | 'error';
}