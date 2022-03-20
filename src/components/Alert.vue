<template>
  <div
    class="p-4 mb-4 text-sm rounded-lg"
    :class="[variantClass]"
    role="alert"
    v-bind="$attrs"
    v-if="text"
  >
    {{ text }}
  </div>
</template>

<script lang="ts">
import type { AlertVariantType } from "@/typings";
import { computed, defineComponent, toRefs, type PropType } from "vue";

export default defineComponent({
  name: "AlertComponent",
  props: {
    variant: {
      type: String as PropType<AlertVariantType>,
      required: true,
    },
    text: {
      type: String,
      required: false,
      default: () => "",
    },
  },
  setup(props) {
    const { variant } = toRefs(props);

    // Computed
    const variantClass = computed(() => {
      switch (variant.value) {
        case "error":
          return "text-red-700 bg-red-100";

        case "info":
          return "text-blue-700 bg-blue-100";

        case "success":
          return "text-green-700 bg-green-100";

        default:
          return "text-gray-700 bg-gray-100";
      }
    });

    return { variantClass };
  },
});
</script>
