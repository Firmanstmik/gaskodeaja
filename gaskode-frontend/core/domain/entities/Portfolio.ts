export interface Portfolio {
  id?: number;
  category_id: number;
  title: string;
  client_name: string;
  image_thumbnail: string;
  problems: string[];
  solutions: string[];
  results: string[];
}