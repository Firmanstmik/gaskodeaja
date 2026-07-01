export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface CreateCategoryDTO {
  name: string;
}