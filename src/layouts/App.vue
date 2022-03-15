<template>
  <Sidebar width="w-64" />

  <main class="ml-64">
    <Header />

    <div class="container">
      <router-view></router-view>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Sidebar from "../components/includes/Sidebar.vue";
import Header from "@/components/includes/Header.vue";

export default defineComponent({
  name: "AppLayout",
  components: { Header, Sidebar },
});
</script>
