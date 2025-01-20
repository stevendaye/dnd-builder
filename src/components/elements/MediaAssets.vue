<template>
  <div class="flex flex-col gap-1 mt-auto p-2 bg-[#D7F5E7] rounded-md">
    <h3 class="text-sm font-InterMedium">Media Asset</h3>
    <p class="text-xs mt-1 mb-2">Your recent working images</p>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
      <img
        v-for="img in assets"
        :src="img"
        alt="Predifined Img 1"
        class="size-32 hover:border-2 border-[#1dab65] rounded-md hover:cursor-select"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";

defineProps({
  assets: {
    type: Array as PropType<string[]>,
    required: true,
  },
});
</script>
