import { http } from "@/services/axios";
import type { StoreCategoryRequest } from "@/types/request";
import type { CategoriesResponse } from "@/types/response";

class CategoryService {
  private endpoint = "/categories";

  public index(): Promise<CategoriesResponse> {
    return http.get(this.endpoint);
  }
  public store(data: StoreCategoryRequest) {
    return http.post(this.endpoint, data);
  }
}

export const categoryService = new CategoryService();
