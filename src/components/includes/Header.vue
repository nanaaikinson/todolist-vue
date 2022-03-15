<template>
  <header class="flex items-center h-14 bg-white shadow-sm">
    <div class="container flex">
      <ul class="ml-auto flex space-x-2 items-center">
        <li></li>
        <li>
          {{ user?.name }}
        </li>
      </ul>
    </div>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useAuthStore } from "@/stores/auth";

export default defineComponent({
  name: "Header",
  setup() {
    const authStore = useAuthStore();
    const user = computed(() => authStore.GetUser);

    return { user };
  },
});
</script>
