import { ApiUserRepository } from "@/core/infrastructure/repositories/ApiUserRepository";
import { CreateUserDTO, UpdateUserDTO } from "@/core/domain/entities/User";

const userRepo = new ApiUserRepository();

export const UserUseCase = {
  async getUsers() {
    return await userRepo.getAll();
  },
  
  async getUser(id: number) {
    return await userRepo.getById(id);
  },

  async createUser(data: CreateUserDTO) {
    return await userRepo.create(data);
  },

  async updateUser(id: number, data: UpdateUserDTO) {
    return await userRepo.update(id, data);
  },

  async deleteUser(id: number) {
    return await userRepo.delete(id);
  }
};