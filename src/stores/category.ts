import { defineStore } from "pinia";
import type { Category } from "@/typings";
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
    GetCategory(state) {
      const categories = state.categories;

      return (id: number) => categories.find((item) => item.id === id);
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
    UpdateCategory(payload: Category) {
      const index = this.categories.findIndex((item) => item.id === payload.id);
      if (index !== -1) {
        this.categories[index] = payload;
      }
    },
  },
});
