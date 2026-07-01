import { User, CreateUserDTO, UpdateUserDTO } from "../entities/User";

export interface UserRepository {
  getAll(): Promise<User[]>;
  getById(id: number): Promise<User>;
  create(data: CreateUserDTO): Promise<User>;
  update(id: number, data: UpdateUserDTO): Promise<User>;
  delete(id: number): Promise<void>;
}