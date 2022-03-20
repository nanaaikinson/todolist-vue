<template>
  <div class="badge" v-bind="$attrs">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Badge",
});
</script>
