<template>
  <div
    class="flex flex-col gap-1 lg:mt-auto p-2 bg-[#D7F5E7] rounded-md w-full"
  >
    <h3 class="text-sm font-InterMedium">Media Asset</h3>
    <p class="text-xs mt-1 mb-2">Your recent working images</p>
    <div class="grid grid-cols-4 md:grid-cols-1 lg:grid-cols-2 gap-2">
      <div v-for="img in assets" class="max-w-[208px]">
        <img
          :key="img"
          :src="img"
          alt="Predifined Img 1"
          class="w-full h-full object-cover rounded-md hover:cursor-select"
        />
      </div>
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
