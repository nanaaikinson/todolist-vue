<template>
  {{ user }}
</template>

<script lang="ts">
import { useAuthStore } from "@/stores/auth";
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "DashboardPage",
  setup() {
    const authStore = useAuthStore();

    const user = computed(() => authStore.GetUser);

    return { user };
  },
});
</script>
