<template>
  <nav class="tab">
    <a
      v-for="(t, i) in tabs"
      class="tab-link cursor-pointer"
      :class="{ active: tab === i }"
      :key="i"
      @click="setTab(i)"
      >{{ t.title }}</a
    >
  </nav>
</template>

<script setup lang="ts">
import { toRefs } from "vue";

interface Tab {
  title: string;
}

interface TabsProps {
  tabs: Array<Tab>;
  tab: number;
}

// Emit
const emit = defineEmits<{ (event: "update:tab", tabIndex: number): void }>();

// Props
const props = defineProps<TabsProps>();
const { tabs, tab } = toRefs(props);

// Methods
const setTab = (index: number) => {
  emit("update:tab", index);
};
</script>
