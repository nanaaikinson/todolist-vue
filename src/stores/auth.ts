import type { AuthUser } from "@/typings";
import { defineStore } from "pinia";

interface RootAuthState {
  user: AuthUser | null;
}

export const useAuthStore = defineStore("auth", {
  state: () =>
    ({
      user: null,
    } as RootAuthState),
  getters: {
    GetAuthenticated(state) {
      return !!state.user;
    },
    GetUser(state): RootAuthState["user"] {
      return state.user;
    },
  },
  actions: {
    SetUser(data: AuthUser) {
      this.user = data;
    },
    SetToken(accessToken: string) {
      localStorage.setItem("accessToken", accessToken);
    },
  },
});
