import type { LoginRequest, RegisterRequest } from "@/types/request";
import type { LoginResponse } from "@/types/response";
import { http } from "./axios";

class AuthService {
  private endpoint = "/auth";

  public login(data: LoginRequest): Promise<LoginResponse> {
    return http.post(`${this.endpoint}/login`, data);
  }

  public register(data: RegisterRequest): Promise<{ message: string }> {
    return http.post(`${this.endpoint}/register`, data);
  }

  public user(): Promise<{ data: { name: string; avatar: string } }> {
    return http.get(`${this.endpoint}/user`);
  }
}

export const authService = new AuthService();
