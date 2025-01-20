<template>
  <div class="flex flex-col gap-1">
    <h3 class="text-xs font-InterMedium px-2">Media</h3>
    <div
      class="flex items-center gap-2 w-full p-2 hover:bg-[#F3F4F6] transition duration-300 hover:cursor-pointer rounded-md"
      role="button"
      tabindex=""
      @keydown="addImageBlock"
      @click="addImageBlock"
    >
      <v-icon
        name="oi-image"
        scale="1.5"
        style="
          color: white;
          padding: 5px;
          background: #6772e6;
          border-radius: 4px;
        "
      />
      <p class="text-sm font-inter">Image Element</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import type { Block } from "../../types";

const props = defineProps({
  uniqueIdCounter: {
    type: Number,
    required: true,
  },
  list: {
    type: Array as PropType<Block[]>,
    required: true,
  },
});

const emit = defineEmits(["update:list", "update:uniqueIdCounter"]);

const addImageBlock = () => {
  const newImageBlock: Block = {
    id: props.uniqueIdCounter,
    type: "image",
    image: "/image-1.png",
    order: 1,
  };

  const updatedList = [...props.list, newImageBlock].map((block, i) => ({
    ...block,
    order: i + 1,
  }));

  emit("update:list", updatedList);
  emit("update:uniqueIdCounter", props.uniqueIdCounter + 1);
};
</script>
