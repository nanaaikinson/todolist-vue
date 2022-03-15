<template>
  <div class="row">
    <div class="col-12 lg:col-9"></div>

    <div class="col-12 lg:col-3">
      <Categories />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Categories from "@/components/categories/Categories.vue";

export default defineComponent({
  name: "TasksPage",
  components: { Categories },
});
</script>
