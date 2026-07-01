import { Post, CreatePostDTO, UpdatePostDTO } from "../entities/Post";

export interface PostRepository {
  getAll(): Promise<Post[]>;
  getBySlug(slug: string): Promise<Post>;
  create(data: CreatePostDTO): Promise<Post>;
  update(id: number, data: UpdatePostDTO): Promise<Post>;
  delete(id: number): Promise<void>;
}