<template>
  <Modal size="sm" :visible="computedVisibility">
    <div
      class="border-b border-gray-200 px-5 py-2 flex justify-between items-center"
    >
      <h4>Category</h4>
      <button
        class="h-8 w-8 text-xl rounded flex items-center justify-center hover:bg-gray-200 hover:text-gray-900"
        @click="closeModal"
      >
        <i class="bx bx-x"></i>
      </button>
    </div>

    <div class="px-5 py-5">
      <form @submit.prevent="saveCategory">
        <Alert :text="alertData.text" :variant="alertData.variant" />

        <div class="mb-4">
          <label for="name" class="block">Category Name</label>
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
          <label class="block mb-1">Pick Color</label>
          <ul class="flex space-x-3">
            <li v-for="(c, i) in colors" :key="i">
              <div
                class="h-6 w-6 p-0.5 border rounded-full"
                :class="[
                  c === color ? 'border-gray-200' : 'border-transparent',
                ]"
              >
                <label
                  class="h-full w-full block rounded-full cursor-pointer"
                  :for="`color-${i}`"
                  :style="{ backgroundColor: `${c}` }"
                >
                  <input
                    type="radio"
                    name="color"
                    :id="`color-${i}`"
                    class="hidden"
                    :value="c"
                    v-model="color"
                  />
                </label>
              </div>
            </li>
          </ul>
          <InputError :error="errors.color" />
        </div>

        <button class="btn btn-primary w-full mt-5">Save Category</button>
      </form>
    </div>
  </Modal>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs, watch } from "vue";
import { useField, useForm } from "vee-validate";
import InputError from "@/components/InputError.vue";
import { categoryFormSchema } from "@/schema/form";
import Modal from "@/components/Modal.vue";
import type { StoreCategoryRequest } from "@/types/request";
import axios from "axios";
import { categoryService } from "@/services/category";
import { ResponseEnum } from "@/types/enums";
import Alert from "@/components/Alert.vue";
import type { AlertVariantType } from "@/types";
import { useCategoryStore } from "@/stores/category";

export default defineComponent({
  name: "Category",
  components: { Alert, Modal, InputError },
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
    // Props
    const { id } = toRefs(props);

    // Data
    const categoryStore = useCategoryStore();
    const colors = [
      "#E58D8D33",
      "#67CBAC33",
      "#A867CB33",
      "#8A904833",
      "#7367CB33",
      "#CB916733",
    ];
    const { errors, validate, resetForm, setFieldError, setFieldValue } =
      useForm({
        validationSchema: categoryFormSchema,
      });
    const { value: name } = useField<string>("name");
    const { value: color } = useField<string>("color");
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

    // Watch
    watch(
      () => id.value,
      (val) => {
        if (val && val > 0) {
          const category = categoryStore.GetCategory(val);
          if (category) {
            setFieldValue("name", category.name);
            setFieldValue("color", category.color);
          }
        }
      }
    );

    // Methods
    const closeModal = () => {
      computedVisibility.value = false;
      resetForm();
    };
    const saveCategory = async () => {
      const valid = await validate();

      if (valid) {
        const data: StoreCategoryRequest = {
          name: name.value,
          color: color.value,
        };

        try {
          if (id.value && id.value > 0) {
            const response = await categoryService.update(id.value, data);
            categoryStore.UpdateCategory({
              id: response.data.id,
              name: response.data.name,
              color: response.data.color,
            });
          } else {
            const response = await categoryService.store(data);
            categoryStore.AddCategory({
              id: response.data.id,
              name: response.data.name,
              color: response.data.color,
            });
          }

          resetForm();
          alertData.text = "";
          emit("update:id", 0);
          emit("update:visible", false);
        } catch (error) {
          if (axios.isAxiosError(error) && error.response) {
            const { status, data } = error.response;

            if (status === ResponseEnum.UNPROCESSABLE_REQUEST) {
              for (const key in data.errors) {
                if (key === "name") setFieldError(key, data.errors[key]);
                if (key === "color") setFieldError(key, data.errors[key]);
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
      colors,
      errors,
      name,
      color,
      computedVisibility,
      alertData,
      saveCategory,
      closeModal,
    };
  },
});
</script>
