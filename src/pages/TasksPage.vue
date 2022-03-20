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

        <Tabs :tabs="tabs" v-model:tab="tab" />

        <div class="my-8">
          <Table :columns="columns" :items="tasks">
            <template #category="{ item }">
              <Badge :style="{ backgroundColor: `${item.category.color}` }">{{
                item.category.name
              }}</Badge>
            </template>

            <template #status="{ item }">
              <Badge :style="{ backgroundColor: `#F4FFF2` }" v-if="item.status"
                >Completed</Badge
              >
              <Badge :style="{ backgroundColor: `#677ACB66` }" v-else
                >In progress</Badge
              >
            </template>

            <template #actions="{ item }">
              <button :data-id="item.id">
                <i class="bx bx-dots-vertical-rounded"></i>
              </button>
            </template>
          </Table>
        </div>
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
import { computed, defineComponent, onMounted, ref } from "vue";
import { useTaskStore } from "@/stores/tasks";
import { formatDate } from "@/utils/helpers";
import type { TableColumns, TabsProps } from "@/typings";

import Categories from "@/components/categories/Categories.vue";
import Tabs from "../components/Tabs.vue";
import Task from "../components/tasks/Task.vue";
import Table from "../components/Table.vue";
import Badge from "../components/Badge.vue";

export default defineComponent({
  name: "TasksPage",
  components: { Categories, Tabs, Task, Table, Badge },
  setup() {
    const taskStore = useTaskStore();
    const columns: TableColumns = [
      { key: "name", label: "Name" },
      { key: "category", label: "Category" },
      { key: "created_at", label: "Created At" },
      { key: "due_date", label: "Due Date" },
      { key: "status", label: "Status" },
      { key: "actions", label: "" },
    ];

    // Data
    const tab = ref<number>(0);
    const tabs = ref<TabsProps["tabs"]>([
      { title: "All" },
      { title: "Today" },
      { title: "Upcoming" },
      { title: "Past tasks" },
    ]);
    const showTaskModal = ref<boolean>(false);
    const today = formatDate(new Date());

    // Computed
    const allTasks = computed(() =>
      taskStore.GetTasks.map((item) => {
        return {
          ...item,
          created_at: formatDate(item.created_at, "DD/MM/YYYY"),
          due_date: formatDate(item.due_date, "DD/MM/YYYY"),
        };
      })
    );
    const todayTasks = computed(() => {
      return allTasks.value.filter((task) => {
        const date = formatDate(task.due_date);

        return date === today;
      });
    });
    const pastTasks = computed(() => {
      return allTasks.value.filter((task) => {
        const date = formatDate(task.due_date);

        return date < today;
      });
    });
    const upcomingTasks = computed(() => {
      return allTasks.value.filter((task) => {
        const date = formatDate(task.due_date);

        return date > today;
      });
    });
    const tasks = computed(() => {
      switch (tab.value) {
        case 1:
          return todayTasks.value;
        case 2:
          return upcomingTasks.value;
        case 3:
          return pastTasks.value;
        default:
          return allTasks.value;
      }
    });

    // Hooks
    onMounted(async () => {
      await taskStore.FetchTasks();
    });

    return {
      tab,
      columns,
      tabs,
      showTaskModal,
      tasks,
    };
  },
});
</script>
