export interface Testimonial {
  id: number;
  name: string;
  position: string;
  content: string;
  rating: number; // 1 - 5
  portfolio_id?: number | null;
}

export interface CreateTestimonialDTO {
  name: string;
  position: string;
  content: string;
  rating: number;
  portfolio_id?: number | null;
}

export interface UpdateTestimonialDTO extends CreateTestimonialDTO {}