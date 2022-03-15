import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes";
import { useAuthStore } from "@/stores/auth";
import { authService } from "@/services/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const authenticated = authStore.GetAuthenticated;

  if (to.meta.requiresAuth) {
    if (authenticated) {
      next();
    } else {
      try {
        const response = await authService.user();
        authStore.SetUser(response.data);

        next();
      } catch (error) {
        next({ name: "Home" });
      }
    }
  } else {
    next();
  }
});

export default router;
