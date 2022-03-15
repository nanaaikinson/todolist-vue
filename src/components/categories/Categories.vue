<template>
  <div class="border-l border-gray-200 h-screen px-5">
    <h4 class="mb-10 font-semibold">Categories</h4>

    <ul class="space-y-3 mb-8">
      <li v-for="(category, i) in categories" :key="i" class="group">
        <div class="flex items-center space-x-3">
          <div
            class="h-5 w-5 rounded-full"
            :style="{ backgroundColor: `${category.color}` }"
          ></div>

          <div class="flex space-x-6 items-center">
            <span>{{ category.name }}</span>

            <button
              class="items-center justify-center hidden group-hover:inline-flex"
              @click="storeOrUpdateCategory(category.id)"
            >
              <i class="bx bxs-pencil"></i>
            </button>
          </div>
        </div>
      </li>
    </ul>

    <button
      class="text-primary inline-flex items-center space-x-1"
      @click="storeOrUpdateCategory"
    >
      <span>Add category</span>
      <i class="bx bx-plus"></i>
    </button>
  </div>

  <teleport to="#modals">
    <Category v-model:visible="showCategory" v-model:id="categoryId" />
  </teleport>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { useCategoryStore } from "@/stores/category";
import Category from "@/components/categories/Category.vue";

export default defineComponent({
  name: "Categories",
  components: { Category },
  setup() {
    const categoryStore = useCategoryStore();
    const showCategory = ref<boolean>(false);
    const categoryId = ref<number>(0);

    // Computed
    const categories = computed(() => categoryStore.GetCategories);

    // Methods
    const storeOrUpdateCategory = async (id?: number) => {
      if (id) {
        categoryId.value = id as number;
      }
      showCategory.value = true;
    };

    // Hooks
    onMounted(async () => {
      await categoryStore.FetchCategories();
    });

    return {
      showCategory,
      categories,
      categoryId,
      storeOrUpdateCategory,
    };
  },
});
</script>
