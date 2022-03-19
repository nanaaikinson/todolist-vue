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
        <div>
          <table>
            <thead>
              <tr>
                <th>Task name</th>
                <th>Category</th>
                <th>Date created</th>
                <th>Due date</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="task in allTasks" :key="task.id">
                <td>{{ task.name }}</td>
                <td>{{ task.category }}</td>
                <td>{{ task.created_at }}</td>
                <td>{{ task.due_date }}</td>
                <td>{{ task.status }}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
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
import type { TabsProps } from "@/typings";

import Categories from "@/components/categories/Categories.vue";
import Tabs from "../components/Tabs.vue";
import Task from "../components/tasks/Task.vue";
import { formatDate } from "@/utils/helpers";

export default defineComponent({
  name: "TasksPage",
  components: { Categories, Tabs, Task },
  setup() {
    const taskStore = useTaskStore();

    // Data
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
          created_at: formatDate(item.created_at),
          due_date: formatDate(item.due_date),
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

    // Hooks
    onMounted(async () => {
      await taskStore.FetchTasks();
    });

    return {
      tabs,
      showTaskModal,
      allTasks,
      todayTasks,
      pastTasks,
      upcomingTasks,
    };
  },
});
</script>
