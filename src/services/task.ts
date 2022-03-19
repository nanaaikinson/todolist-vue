import { http } from "@/services/axios";
import type { StoreTaskRequest } from "@/typings/request";
import type { TaskResponse, TasksResponse } from "@/typings/response";

class TaskService {
  private endpoint = "/tasks";

  public index(): Promise<TasksResponse> {
    return http.get(this.endpoint);
  }

  public store(data: StoreTaskRequest): Promise<TaskResponse> {
    return http.post(this.endpoint, data);
  }

  public update(id: number, data: StoreTaskRequest): Promise<TaskResponse> {
    return http.patch(`${this.endpoint}/${id}`, data);
  }

  public destroy(id: number): Promise<void> {
    return http.delete(`${this.endpoint}/${id}`);
  }
}

export const taskService = new TaskService();
