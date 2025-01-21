<template>
  <div class="flex flex-col gap-1">
    <h3 class="text-xs font-InterMedium px-2">Input</h3>
    <AddBlockButton
      :icon="`co-text`"
      :block-type="`Add Text Element`"
      @update:add="addTextBlock"
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

const addTextBlock = () => {
  const newTextBlock: Block = {
    id: props.uniqueIdCounter,
    type: "text",
    text: "Edit text here",
    order: 1,
  };

  const updatedList = [...props.list, newTextBlock].map((block, i) => ({
    ...block,
    order: i + 1,
  }));

  emit("update:list", updatedList);
  emit("update:uniqueIdCounter", props.uniqueIdCounter + 1);
};
</script>
