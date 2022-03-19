import type { Category } from "@/types/index";

export interface LoginResponse {
  data: {
    access_token: string;
    user: {
      name: string;
      avatar: string | null;
    };
  };
}

export interface CategoryResponse {
  data: Category;
}

export interface CategoriesResponse {
  data: Array<Category>;
}
