<template>
  <div class="border-l border-gray-200 h-screen px-5">

  </div>

  <teleport to="#modals">
    <Category v-model:visible="showCategory" />
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

    // Computed
    const categories = computed(() => categoryStore.GetCategories);

    // Methods

    // Hooks
    onMounted(async () => {
      await categoryStore.FetchCategories();
    });

    return { showCategory, categories };
  },
});
</script>
