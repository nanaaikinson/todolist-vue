export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface StoreCategoryRequest {
  name: string;
  color: string;
}

export interface StoreTaskRequest {
  name: string;
  due_date: string;
  category: number;
  status?: string;
  description?: string;
}
