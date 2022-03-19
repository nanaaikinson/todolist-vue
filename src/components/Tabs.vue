<template>
  <nav class="tab">
    <a
      v-for="(tab, i) in tabs"
      class="tab-link cursor-pointer"
      :class="{ active: selected === i }"
      :key="i"
      >{{ tab.title }}</a
    >
  </nav>
</template>

<script setup lang="ts">
import { ref, toRefs } from "vue";

interface Tab {
  title: string;
}

interface TabsProps {
  tabs: Array<Tab>;
}

// Props
const props = defineProps<TabsProps>();
const { tabs } = toRefs(props);

// Data
const selected = ref<number>(0);
</script>
