<template>
  <div class="row">
    <div class="col-12 lg:col-9">
      <div class="pt-12">
        <div class="flex justify-between items-center mb-10">
          <h4 class="font-semibold">Tasks</h4>
          <button class="btn btn-primary" @click="showTaskModal = true">
            Add Task
          </button>
        </div>

        <Tabs :tabs="tabs" />
      </div>
    </div>

    <div class="col-12 lg:col-3">
      <Categories />
    </div>
  </div>

  <teleport to="#modals">
    <Task v-model:visible="showTaskModal" :id="0" />
  </teleport>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import type { TabsProps } from "@/typings";
import Categories from "@/components/categories/Categories.vue";
import Tabs from "../components/Tabs.vue";
import Task from "../components/Task.vue";

export default defineComponent({
  name: "TasksPage",
  components: { Categories, Tabs, Task },
  setup() {
    // Data
    const tabs = ref<TabsProps["tabs"]>([
      { title: "All" },
      { title: "Today" },
      { title: "Upcoming" },
      { title: "Past tasks" },
    ]);
    const showTaskModal = ref<boolean>(true);

    return { tabs, showTaskModal };
  },
});
</script>
