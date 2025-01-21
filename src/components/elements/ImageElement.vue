<template>
  <div class="flex flex-col gap-1">
    <h3 class="text-xs font-InterMedium px-2">Media</h3>
    <AddBlockButton
      :icon="`oi-image`"
      :block-type="`Add Image Element`"
      @update:add="addImageBlock"
    />
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import type { Block } from "../../types";
import AddBlockButton from "../buttons/AddBlockButton.vue";

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
    image: "",
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
