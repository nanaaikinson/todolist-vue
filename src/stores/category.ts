import { defineStore } from "pinia";
import type { Category } from "@/types";
import { categoryService } from "@/services/category";

interface RootCategoryState {
  categories: Array<Category>;
}

export const useCategoryStore = defineStore("category", {
  state: () =>
    ({
      categories: [],
    } as RootCategoryState),
  getters: {
    GetCategories(state) {
      return state.categories;
    },
  },
  actions: {
    async FetchCategories() {
      const response = await categoryService.index();
      this.categories = response.data;
    },
    AddCategory(payload: Category) {
      this.categories.push(payload);
    },
  },
});
