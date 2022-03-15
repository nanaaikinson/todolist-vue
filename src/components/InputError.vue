<template>
  <span class="block text-red-500 text-sm" v-if="error">{{ error }}</span>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "InputError",
  props: {
    error: {
      type: String,
      required: false,
      default: "",
    },
  },
});
</script>
