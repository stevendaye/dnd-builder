<template>
  <div v-if="element.type === 'text'" class="w-[75%]">
    <input
      type="text"
      class="py-4 px-3 bg-[#F3F4F6] w-full text-sm"
      v-model="element.text"
      placeholder="Campaigns | Email Marketing | Landing Pages | Automation etc..."
    />
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import type { TextBlock } from "../../types";

defineProps({
  element: {
    type: Object as PropType<TextBlock>,
    required: true,
  },
});
</script>
