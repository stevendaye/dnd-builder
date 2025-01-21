<template>
  <div v-if="element.type === 'image'" class="w-[75%] flex flex-col gap-2 py-4">
    <div class="size-[35%] relative hover:cursor-pointer group">
      <div
        v-if="element.image"
        class="hidden absolute top-0 left-0 w-full h-full text-xs sm:text-[16px] text-white rounded-md group-hover:block text-center"
        style="background: rgba(0, 0, 0, 0.7)"
        role="button"
        tabindex=""
        @keydown="openModal(blockId, true)"
        @click="openModal(blockId, true)"
      >
        <p class="flex flex-col justify-center items-center w-full h-full">
          Replace image
        </p>
      </div>

      <img
        v-if="element.image"
        :src="element.image"
        alt="Predefined Media"
        class="w-full h-full object-cover rounded-md"
      />

      <div
        v-else
        class="w-full h-full border rounded-md relative text-center"
        role="button"
        tabindex=""
        @keydown="openModal(blockId, true)"
        @click="openModal(blockId, true)"
      >
        <h4 class="text-xs text-slate-600 p-0 lg:px-4 absolute bottom-2 w-full">
          Click here <span class="hidden lg:block">to pick an image</span>
        </h4>
        <img src="/image-placeholder.png" class="w-full h-full" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import type { ImageBlock } from "../../types";

defineProps({
  blockId: {
    type: Number,
    required: true,
  },
  element: {
    type: Object as PropType<ImageBlock>,
    required: true,
  },
});

const emit = defineEmits(["update:modal"]);

const openModal = (blockId: number, open: boolean) => {
  emit("update:modal", { blockId, open });
};
</script>
