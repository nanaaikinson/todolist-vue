import { defineStore } from "pinia";
import { taskService } from "@/services/task";
import { useCategoryStore } from "./category";
import type { Task } from "@/typings";

interface RootTasksStore {
  tasks: Array<Task>;
}

export const useTaskStore = defineStore("tasks", {
  state: () => ({ tasks: [] } as RootTasksStore),
  getters: {
    GetTasks(state) {
      return state.tasks;
    },
  },
  actions: {
    async FetchTasks() {
      const categoryStore = useCategoryStore();

      const response = await taskService.index();
      const tasks = response.data.map((task) => {
        const category = categoryStore.GetCategories.find(
          (record) => record.id === task.category_id
        );

        if (category) {
          return { ...task, category: category };
        }
        return task;
      });

      this.tasks = tasks;
    },
    AddTasks(payload: Task) {
      this.tasks.push(payload);
    },
    UpdateTask(payload: Task) {
      const index = this.tasks.findIndex((item) => item.id === payload.id);
      if (index !== -1) {
        this.tasks[index] = payload;
      }
    },
  },
});
