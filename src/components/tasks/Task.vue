<template>
  <Modal size="lg" :visible="computedVisibility">
    <div
      class="border-b border-gray-200 px-5 py-2 flex justify-between items-center"
    >
      <h4 class="mb-0">Task</h4>
      <button
        class="h-8 w-8 text-xl rounded flex items-center justify-center hover:bg-gray-200 hover:text-gray-900"
        @click="closeModal"
      >
        <i class="bx bx-x"></i>
      </button>
    </div>

    <div class="px-5 py-5">
      <form @submit.prevent="saveTask">
        <Alert :variant="alertData.variant" :text="alertData.text" />

        <div class="row">
          <div class="col-12 lg:col-6 mb-3">
            <label for="name">Task name*</label>
            <input
              type="text"
              name="name"
              id="name"
              class="form-input"
              v-model.trim="name"
            />
            <InputError :error="errors.name" />
          </div>

          <div class="col-12 lg:col-6 mb-3">
            <label for="due_date">Due date*</label>
            <input
              type="date"
              name="due_date"
              id="due_date"
              class="form-input"
              v-model.trim="due_date"
            />
            <InputError :error="errors.due_date" />
          </div>

          <div class="col-12 lg:col-6 mb-3">
            <label for="category">Category*</label>
            <select
              name="category"
              id="category"
              class="form-select"
              v-model="category"
            >
              <option value="">Select category</option>
              <option v-for="c in categories" :key="c.id" :value="c.id">
                {{ c.name }}
              </option>
            </select>
            <InputError :error="errors.category" />
          </div>

          <div class="col-12 lg:col-6 mb-3">
            <label for="status">Status</label>
            <select
              name="status"
              id="status"
              class="form-select"
              v-model="status"
            >
              <option value="">Select status</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <InputError :error="errors.status" />
          </div>

          <div class="col-12">
            <label for="description">Description</label>
            <textarea
              name="description"
              id="description"
              cols="30"
              rows="4"
              class="form-input"
              v-model.trim="description"
            ></textarea>
          </div>
        </div>

        <div class="mt-6">
          <button class="btn btn-primary w-1/5">Save</button>
        </div>
      </form>
    </div>
  </Modal>
</template>

<script lang="ts">
import { taskFormSchema } from "@/schema/form";
import { useField, useForm } from "vee-validate";
import { computed, defineComponent, reactive } from "vue";
import { useCategoryStore } from "@/stores/category";
import { ResponseEnum } from "@/typings/enums";
import type { StoreTaskRequest } from "@/typings/request";
import type { AlertVariantType } from "@/typings";

import Modal from "../Modal.vue";
import InputError from "../InputError.vue";
import axios from "axios";
import Alert from "../Alert.vue";
import { taskService } from "@/services/task";

export default defineComponent({
  name: "Task",
  components: { Modal, InputError, Alert },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
  },
  emits: ["update:visible", "update:id"],
  setup(props, { emit }) {
    // Data
    const categoryStore = useCategoryStore();
    const { errors, validate, setFieldError, resetForm } = useForm({
      validationSchema: taskFormSchema,
    });
    const { value: name } = useField<string>("name");
    const { value: category } = useField<number>("category");
    const { value: description } = useField<string>("description");
    const { value: due_date } = useField<string>("due_date");
    const { value: status } = useField<string>("status");
    const alertData = reactive<{ variant: AlertVariantType; text: string }>({
      variant: "info",
      text: "",
    });

    // Computed
    const computedVisibility = computed({
      get(): boolean {
        return props.visible;
      },
      set(val: boolean) {
        emit("update:visible", val);
      },
    });
    const categories = computed(() => categoryStore.GetCategories);

    // Methods
    const closeModal = () => {
      computedVisibility.value = false;
      resetForm();
    };

    const saveTask = async () => {
      const { valid } = await validate();

      if (!valid) {
        return;
      }

      const data: StoreTaskRequest = {
        name: name.value,
        due_date: due_date.value,
        category: category.value,
        status: status.value,
        description: description.value,
      };

      try {
        await taskService.store(data);
        closeModal();
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          const { status, data } = error.response;

          if (status === ResponseEnum.UNPROCESSABLE_REQUEST) {
            for (const key in data.errors) {
              if (key === "name") setFieldError(key, data.errors[key]);
              if (key === "due_date") setFieldError(key, data.errors[key]);
              if (key === "category") setFieldError(key, data.errors[key]);
              if (key === "status") setFieldError(key, data.errors[key]);
              if (key === "description") setFieldError(key, data.errors[key]);
            }
          } else {
            alertData.variant = "error";
            alertData.text = data.message;
          }
        }
      }
    };

    return {
      computedVisibility,
      errors,
      name,
      category,
      description,
      due_date,
      status,
      categories,
      alertData,
      closeModal,
      saveTask,
    };
  },
});
</script>
