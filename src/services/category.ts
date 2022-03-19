import { http } from "@/services/axios";
import type { StoreCategoryRequest } from "@/typings/request";
import type { CategoriesResponse, CategoryResponse } from "@/typings/response";

class CategoryService {
  private endpoint = "/categories";

  public index(): Promise<CategoriesResponse> {
    return http.get(this.endpoint);
  }

  public store(data: StoreCategoryRequest): Promise<CategoryResponse> {
    return http.post(this.endpoint, data);
  }

  public update(
    id: number,
    data: StoreCategoryRequest
  ): Promise<CategoryResponse> {
    return http.patch(`${this.endpoint}/${id}`, data);
  }
}

export const categoryService = new CategoryService();
