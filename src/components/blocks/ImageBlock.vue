<template>
  <div v-if="element.type === 'image'" class="w-[75%] flex flex-col gap-2">
    <div class="w-[40%]">
      <img
        :src="element.image"
        alt="Predefined Img"
        class="w-full object-cover"
      />
    </div>

    <div class="flex items-center gap-2">
      <img
        v-for="img in predifinedImages"
        :src="img"
        alt="Predifined Img 1"
        :class="`size-20 hover:border border-[#1dab65] rounded-sm hover:cursor-pointer p-1 ${
          element.image === img && 'border border-[#1dab65]'
        }`"
        @click="updateImage(index, img)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import type { ImageBlock } from "../../types";

defineProps({
  index: {
    type: Number,
    required: true,
  },
  element: {
    type: Object as PropType<ImageBlock>,
    required: true,
  },
});

const emit = defineEmits(["update:image"]);

const predifinedImages: string[] = [
  "/image-1.png",
  "/image-2.png",
  "/image-3.png",
  "/image-4.png",
];

const updateImage = (id: number, img: string) => {
  emit("update:image", id, img);
};
</script>
