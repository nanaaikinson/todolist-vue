<template>
  <aside class="bg-primary fixed h-screen" :class="[width]">
    <div></div>

    <ul class="flex flex-col p-5 space-y-2">
      <li>
        <router-link
          :to="{ name: 'Dashboard' }"
          class="transition duration-300 px-4 py-2 rounded text-white flex items-center space-x-2 hover:bg-[#29325A66]"
        >
          <i class="bx bxs-dashboard text-lg"></i>
          <span>Dashboard</span>
        </router-link>
      </li>
      <li>
        <router-link
          :to="{ name: 'Tasks' }"
          class="transition duration-300 px-4 py-2 rounded text-white flex items-center space-x-2 hover:bg-[#29325A66]"
        >
          <i class="bx bx-task text-lg"></i>
          <span>Tasks</span>
        </router-link>
      </li>
      <li>
        <router-link
          :to="{ name: 'Calendar' }"
          class="transition duration-300 px-4 py-2 rounded text-white flex items-center space-x-2 hover:bg-[#29325A66]"
        >
          <i class="bx bx-calendar-event text-lg"></i>
          <span>Calendar</span>
        </router-link>
      </li>
    </ul>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Sidebar",
  props: {
    width: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped>
.router-link-exact-active {
  @apply bg-[#29325A66];
}
</style>
