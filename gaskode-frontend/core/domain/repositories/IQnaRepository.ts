import { Qna } from "../entities/Qna";

export interface IQnaRepository {
  findAll(): Promise<Qna[]>;
  findById(id: number): Promise<Qna>;
  create(data: Omit<Qna, 'id'>): Promise<void>;
  update(id: number, data: Partial<Qna>): Promise<void>;
  delete(id: number): Promise<void>;
}