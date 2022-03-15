<template>
  <h4 class="text-center font-bold mb-8">Get started in minutes</h4>

  <form @submit.prevent="register">
    <Alert :variant="alertData.variant" :text="alertData.text" class="mb-5" />

    <div class="mb-4">
      <label for="name">Name</label>
      <input
        type="text"
        name="name"
        id="name"
        class="form-input"
        v-model.trim="name"
      />
      <InputError :error="errors.name" />
    </div>

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
          <i :class="showPassword ? 'bx bxs-hide' : 'bx bxs-show'"></i>
        </button>
      </div>
      <InputError :error="errors.password" />
    </div>

    <div class="mb-4">
      <label for="password">Password Confirmation</label>
      <div class="relative">
        <input
          name="password_confirmation"
          id="password_confirmation"
          class="form-input pr-10"
          v-model.trim="password_confirmation"
          :type="showPasswordConfirmation ? 'text' : 'password'"
        />
        <button
          type="button"
          class="absolute top-0 right-0 h-full w-10 flex items-center justify-center text-lg"
          @click="
            () => {
              showPasswordConfirmation = !showPasswordConfirmation;
            }
          "
        >
          <i
            :class="showPasswordConfirmation ? 'bx bxs-hide' : 'bx bxs-show'"
          ></i>
        </button>
      </div>
      <InputError :error="errors.password_confirmation" />
    </div>

    <div class="mb-3">
      <button class="btn btn-primary w-full mt-3">Register</button>
    </div>

    <div class="text-center">
      <div class="text-sm space-x-2">
        <span>Already have an account?</span>
        <router-link :to="{ name: 'Home' }" class="text-primary"
          >Sign in</router-link
        >
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useForm, useField } from "vee-validate";
import { registerFormSchema } from "@/schema/form";
import InputError from "../components/InputError.vue";
import type { RegisterRequest } from "@/types/request";
import axios from "axios";
import { authService } from "@/services/auth";
import { ResponseEnum } from "@/types/enums";
import type { AlertVariantType } from "@/types";
import Alert from "../components/Alert.vue";

export default defineComponent({
  name: "HomeView",
  setup() {
    // Data
    const { errors, validate, setFieldError, resetForm } = useForm({
      validationSchema: registerFormSchema,
    });
    const { value: name } = useField<string>("name");
    const { value: email } = useField<string>("email");
    const { value: password } = useField<string>("password");
    const { value: password_confirmation } = useField<string>(
      "password_confirmation"
    );
    const showPassword = ref<boolean>(false);
    const showPasswordConfirmation = ref<boolean>(false);
    const alertData = reactive<{ variant: AlertVariantType; text: string }>({
      variant: "default",
      text: "",
    });

    // Methods
    const register = async () => {
      const valid = await validate();

      if (valid) {
        const data: RegisterRequest = {
          name: name.value,
          email: email.value,
          password: password.value,
          password_confirmation: password_confirmation.value,
        };

        try {
          const response = await authService.register(data);
          resetForm();
          alertData.variant = "success";
          alertData.text = response.message;
        } catch (error) {
          if (axios.isAxiosError(error) && error.response) {
            const { status, data } = error.response;

            if (status === ResponseEnum.UNPROCESSABLE_REQUEST) {
              for (const key in data.errors) {
                if (key === "name") setFieldError(key, data.errors[key]);
                if (key === "email") setFieldError(key, data.errors[key]);
                if (key === "password") setFieldError(key, data.errors[key]);
                if (key === "password_confirmation")
                  setFieldError(key, data.errors[key]);
              }
            } else {
              alertData.variant = "error";
              alertData.text = data.message;
            }
          }
        }
      }
    };
    return {
      alertData,
      name,
      email,
      password,
      errors,
      showPassword,
      showPasswordConfirmation,
      password_confirmation,
      register,
    };
  },
  components: { InputError, Alert },
});
</script>
