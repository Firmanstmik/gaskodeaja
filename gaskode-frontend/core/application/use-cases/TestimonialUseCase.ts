import { TestimonialRepository } from "../../domain/repositories/TestimonialRepository";
import { CreateTestimonialDTO, UpdateTestimonialDTO } from "../../domain/entities/Testimonial";

export class TestimonialUseCase {
  constructor(private repository: TestimonialRepository) {}

  async fetchAll() { return this.repository.getAll(); }

  async save(data: CreateTestimonialDTO | UpdateTestimonialDTO, id?: number) {
    return id ? this.repository.update(id, data) : this.repository.create(data);
  }

  async remove(id: number) { return this.repository.delete(id); }
}