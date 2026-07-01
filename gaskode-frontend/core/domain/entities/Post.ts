export type PostStatus = 'published' | 'draft';

export interface Post {
  id: number;
  user_id: number;
  category_id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  meta_title?: string;
  meta_description?: string;
  status: PostStatus;
}

export interface CreatePostDTO {
  category_id: number;
  title: string;
  excerpt: string;
  content: string;
  meta_title?: string;
  meta_description?: string;
  status: PostStatus;
}

export interface UpdatePostDTO extends CreatePostDTO {}