<template>
  <div class="w-[650px] h-screen bg-white overflow-y-auto border">
    <p class="text-sm font-InterMedium bg-black p-3 text-white relative">
      <v-icon
        name="bi-info-circle-fill"
        style="position: absolute; top: 5px; right: 5px"
      />

      In case you delete all blocks, you can always add new ones by clicking on
      the <span class="font-InterBlack">Text</span> or
      <span class="font-InterBlack">Image</span> elements by the left hand-side.
    </p>

    <div class="rounded-md pt-5 pb-32 px-5">
      <p
        v-if="list.length === 0"
        class="text-sm font-InterBold text-center px-2 py-10 border-2 border-dashed rounded-md cursor-default"
      >
        Click on Text or Image element to add its draggable block
      </p>

      <draggable
        tag="ul"
        :list="list"
        class="list-group"
        handle=".handle"
        item-key="id"
        @start="dragging = true"
        @end="onDragEnd"
      >
        <template #item="{ element, index }">
          <div
            :class="`flex gap-2 border px-2 py-3 cursor-move rounded-sm bg-white ${
              element.type === 'text' ? 'items-center' : 'items-start'
            }`"
          >
            <v-icon
              name="md-dragindicator-round"
              scale="1.5"
              class="handle cursor-pointer hover:text-[#6772e6] transition duration-300"
              title="Hold & Drag"
            />

            <TextBlock :element="element" />
            <ImageBlock
              :index="index"
              :element="element"
              @update:image="updateImage"
            />

            <!-- Action Buttons -->
            <div class="flex items-center flex-row-reverse gap-2 ml-auto">
              <button @click="removeBlock(index)">
                <v-icon
                  name="md-delete-sharp"
                  scale="1.2"
                  class="cursor-pointer text-slate-500 hover:text-[#6772e6] transition duration-300"
                  title="Delete"
                />
              </button>
              <button @click="duplicateBlock(index)">
                <v-icon
                  name="hi-duplicate"
                  scale="1.2"
                  class="cursor-pointer text-slate-500 hover:text-[#6772e6] transition duration-300"
                  title="Duplicate"
                />
              </button>
            </div>
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script setup lang="ts">
import draggable from "vuedraggable";
import { ref, type PropType } from "vue";
import type { Block } from "../types";
import TextBlock from "./blocks/TextBlock.vue";
import ImageBlock from "./blocks/ImageBlock.vue";

const props = defineProps({
  uniqueIdCounter: {
    type: Number,
    required: true,
  },
  assets: {
    type: Array as PropType<string[]>,
    required: true,
  },
  list: {
    type: Array as PropType<Block[]>,
    required: true,
  },
});

const emit = defineEmits([
  "update:assets",
  "update:uniqueIdCounter",
  "update:list",
]);

const dragging = ref<boolean>(false);

const onDragEnd = () => {
  const updatedList = props.list.map((block, i) => ({
    ...block,
    order: i + 1,
  }));
  emit("update:list", updatedList);
};

const updateAssets = (img: string) => {
  const updatedAssets = [...props.assets, img];
  emit("update:assets", updatedAssets);
};

const updateImage = (index: number, selectedImage: string) => {
  const updatedList = [...props.list];
  const imageBlock = updatedList[index];

  if (imageBlock && imageBlock.type === "image") {
    imageBlock.image = selectedImage;
    emit("update:list", updatedList);
  }

  if (!props.assets.includes(selectedImage)) {
    updateAssets(selectedImage);
  }
};

const removeBlock = (index: number) => {
  const updatedList = props.list
    .filter((_, i) => i !== index)
    .map((block, i) => ({
      ...block,
      order: i + 1,
    }));

  emit("update:list", updatedList);
};

const duplicateBlock = (index: number) => {
  const blockToDuplicate = props.list[index];
  const updatedList = [...props.list];

  const duplicatedBlock: Block = {
    ...blockToDuplicate,
    id: props.uniqueIdCounter,
    order: blockToDuplicate.order,
  };

  updatedList.splice(index + 1, 0, duplicatedBlock);
  updatedList.forEach((block, i) => (block.order = i + 1));

  emit("update:list", updatedList);
  emit("update:uniqueIdCounter", props.uniqueIdCounter + 1);
};
</script>
