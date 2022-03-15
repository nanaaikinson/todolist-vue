<template>
  <div class="h-screen w-screen flex items-center justify-center">
    <div class="w-full max-w-sm">
      <Card class="p-8 rounded-lg shadow-sm">
        <h4 class="text-center font-semibold text-lg mb-5">TODOLIST</h4>

        <router-view></router-view>
      </Card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Card from "../components/Card.vue";

export default defineComponent({
  name: "AuthLayout",
  components: { Card },
});
</script>
