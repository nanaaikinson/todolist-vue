<template>
  <div
    class="overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center h-modal md:h-full md:inset-0 bg-black bg-opacity-50"
    :class="[visible ? 'flex' : 'hidden']"
  >
    <div class="relative px-4 w-full h-full md:h-auto" :class="[modalSize]">
      <div class="relative bg-white rounded-lg shadow">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { PropType } from "vue";
import { computed, defineComponent, toRefs } from "vue";

export default defineComponent({
  name: "Modal",
  props: {
    size: {
      type: String as PropType<"sm" | "md" | "lg" | "full">,
      required: false,
      default: () => "md",
    },
    visible: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    const { size } = toRefs(props);

    const modalSize = computed(() => {
      switch (size.value) {
        case "sm":
          return "max-w-md";
        case "lg":
          return "max-w-4xl";
        case "full":
          return "max-w-7xl";
        default:
          return "max-w-lg";
      }
    });

    return { modalSize };
  },
});
</script>
