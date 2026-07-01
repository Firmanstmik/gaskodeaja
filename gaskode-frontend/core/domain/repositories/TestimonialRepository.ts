import { Testimonial, CreateTestimonialDTO, UpdateTestimonialDTO } from "../entities/Testimonial";

export interface TestimonialRepository {
  getAll(): Promise<Testimonial[]>;
  getById(id: number): Promise<Testimonial>;
  create(data: CreateTestimonialDTO): Promise<Testimonial>;
  update(id: number, data: UpdateTestimonialDTO): Promise<Testimonial>;
  delete(id: number): Promise<void>;
}