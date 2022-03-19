import type { Category, Task } from "@/typings/index";

export interface LoginResponse {
  data: {
    access_token: string;
    user: {
      name: string;
      avatar: string | null;
    };
  };
}

interface Response<T> {
  data: T;
}

export type CategoryResponse = Response<Category>;
export type CategoriesResponse = Response<Array<Category>>;

export type TaskResponse = Response<Task>;
export type TasksResponse = Response<Array<Task>>;
