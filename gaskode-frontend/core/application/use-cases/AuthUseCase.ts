import { Register } from "@/core/domain/entities/Register";
import { ApiAuthRepository } from "../../infrastructure/repositories/ApiAuthRepository";

const repo = new ApiAuthRepository();

export const AuthUseCase = {
  async login(credentials: any) {
    return await repo.login(credentials);
  },

  async register(data: Register) {
    return await repo.register(data);
  },
  
  async logout() {
    return await repo.logout();
  },

  async checkAuth() {
    const user = await repo.getMe();
    if (user.status !== 'success') {
      // Logic if token expired
    }
    return user;
  }
};