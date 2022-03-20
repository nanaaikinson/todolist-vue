<template>
  <div class="w-full overflow-x-auto">
    <table class="w-full whitespace-no-wrap">
      <thead>
        <tr
          class="text-sm font-semibold tracking-wide text-left uppercase border-b"
        >
          <th
            class="px-4 py-3"
            v-for="(column, i) in columns"
            :key="`column-${i}`"
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr class="" v-for="(item, i) in items" :key="`row-${i}`">
          <td
            class="px-4 py-3"
            v-for="(column, j) in columns"
            :key="`row-column-${j}-${i}`"
          >
            <slot :name="column.key" :item="item">
              {{ item[column.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import type { TableColumns } from "@/typings";
import { defineComponent, type PropType } from "vue";

export default defineComponent({
  name: "Table",
  props: {
    columns: {
      type: Array as PropType<TableColumns>,
      required: true,
    },
    items: {
      type: Array as PropType<Array<Record<string, unknown>>>,
      required: true,
    },
  },
  emits: {},
  setup(props, { emit }) {
    // Props
  },
});
</script>
