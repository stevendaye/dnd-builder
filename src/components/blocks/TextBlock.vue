<template>
  <div class="w-[75%]">
    <textarea
      rows="3"
      class="pt-1 pb-3 px-3 bg-white w-full text-sm"
      v-model="element.text"
      placeholder="Campaigns | Email Marketing | Landing Pages | Automation etc..."
    />
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import type { TextBlockType } from "../../types";

defineProps({
  element: {
    type: Object as PropType<TextBlockType>,
    required: true,
  },
});
</script>
