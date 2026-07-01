import { PostRepository } from "../../domain/repositories/PostRepository";
import { CreatePostDTO, UpdatePostDTO } from "../../domain/entities/Post";

export class PostUseCase {
  constructor(private repository: PostRepository) {}

  async fetchAllPosts() {
    return this.repository.getAll();
  }

  async savePost(data: CreatePostDTO | UpdatePostDTO, id?: number) {
    if (id) {
      return this.repository.update(id, data as UpdatePostDTO);
    }
    return this.repository.create(data as CreatePostDTO);
  }

  async removePost(id: number) {
    return this.repository.delete(id);
  }
}