import { Post, CreatePostDTO, UpdatePostDTO } from "../../domain/entities/Post";
import { PostRepository } from "../../domain/repositories/PostRepository";
import { apiClient } from "../services/ApiClient";

export class ApiPostRepository implements PostRepository {
  private readonly path = '/posts';

  async getAll(): Promise<Post[]> {
    const res = await apiClient(this.path);
    return res.json();
  }

  async getBySlug(slug: string): Promise<Post> {
    const res = await apiClient(`${this.path}/${slug}`);
    return res.json();
  }

  async create(data: CreatePostDTO): Promise<Post> {
    const res = await apiClient(this.path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  }

  async update(id: number, data: UpdatePostDTO): Promise<Post> {
    const res = await apiClient(`${this.path}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  }

  async delete(id: number): Promise<void> {
    await apiClient(`${this.path}/${id}`, { method: "DELETE" });
  }
}