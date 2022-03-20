<template>
  <h4 class="text-center font-bold mb-8">Sign in to your account</h4>

  <form @submit.prevent="login">
    <div class="mb-4">
      <label for="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        class="form-input"
        v-model.trim="email"
      />
      <InputError :error="errors.email" />
    </div>

    <div class="mb-4">
      <label for="password">Password</label>
      <div class="relative">
        <input
          name="password"
          id="password"
          class="form-input pr-10"
          v-model.trim="password"
          :type="showPassword ? 'text' : 'password'"
        />
        <button
          type="button"
          class="absolute top-0 right-0 h-full w-10 flex items-center justify-center text-lg"
          @click="
            () => {
              showPassword = !showPassword;
            }
          "
        >
          <i :class="passwordIcon"></i>
        </button>
      </div>
      <InputError :error="errors.password" />
    </div>

    <div class="mb-3">
      <button class="btn btn-primary w-full mt-3">Login</button>
    </div>

    <div class="text-center">
      <div class="text-sm space-x-2">
        <span>Not registered yet?</span>
        <router-link :to="{ name: 'Register' }" class="text-primary"
          >Create an Account</router-link
        >
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useForm, useField } from "vee-validate";
import { loginFormSchema } from "@/schema/form";
import { authService } from "@/services/auth";
import type { LoginRequest } from "@/typings/request";
import InputError from "../components/InputError.vue";
import axios from "axios";
import { ResponseEnum } from "@/typings/enums";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "HomeView",
  setup() {
    // Data
    const authStore = useAuthStore();
    const router = useRouter();
    const { errors, validate, setFieldError } = useForm({
      validationSchema: loginFormSchema,
    });
    const { value: email } = useField<string>("email");
    const { value: password } = useField<string>("password");
    const showPassword = ref<boolean>(false);
    // Computed
    const passwordIcon = computed(() => {
      return showPassword.value ? "bx bxs-hide" : "bx bxs-show";
    });
    // Methods
    const login = async () => {
      const valid = await validate();

      if (valid) {
        const data: LoginRequest = {
          email: email.value,
          password: password.value,
        };

        try {
          const { data: response } = await authService.login(data);
          authStore.SetToken(response.access_token);
          authStore.SetUser(response.user);

          router.replace({ name: "Dashboard" });
        } catch (error) {
          if (axios.isAxiosError(error) && error.response) {
            const { status, data } = error.response;

            if (status === ResponseEnum.UNPROCESSABLE_REQUEST) {
              for (const key in data.errors) {
                if (key === "email") setFieldError(key, data.errors[key]);
                if (key === "password") setFieldError(key, data.errors[key]);
              }
            } else {
              setFieldError("email", data.message);
            }
          }
        }
      }
    };
    return { email, password, errors, showPassword, passwordIcon, login };
  },
  components: { InputError },
});
</script>
