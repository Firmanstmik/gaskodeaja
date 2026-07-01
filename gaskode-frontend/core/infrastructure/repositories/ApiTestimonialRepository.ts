import { Testimonial, CreateTestimonialDTO, UpdateTestimonialDTO } from "../../domain/entities/Testimonial";
import { TestimonialRepository } from "../../domain/repositories/TestimonialRepository";
import { apiClient } from "../services/ApiClient";

export class ApiTestimonialRepository implements TestimonialRepository {
  private readonly path = '/testimonials';

  async getAll(): Promise<Testimonial[]> {
    const res = await apiClient(this.path);
    return res.json();
  }

  async getById(id: number): Promise<Testimonial> {
    const res = await apiClient(`${this.path}/${id}`);
    return res.json();
  }

  async create(data: CreateTestimonialDTO): Promise<Testimonial> {
    const res = await apiClient(this.path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  }

  async update(id: number, data: UpdateTestimonialDTO): Promise<Testimonial> {
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