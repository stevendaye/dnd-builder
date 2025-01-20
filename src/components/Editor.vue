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

            <!-- Text Block -->
            <div v-if="element.type === 'text'" class="w-[75%]">
              <input
                type="text"
                class="py-4 px-3 bg-[#F3F4F6] w-full"
                v-model="element.text"
                placeholder="Campaigns | Email Marketing | Landing Pages | Automation etc..."
              />
            </div>

            <!-- Image Block -->
            <div
              v-if="element.type === 'image'"
              class="w-[75%] flex flex-col gap-2"
            >
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

const predifinedImages: string[] = [
  "/image-1.png",
  "/image-2.png",
  "/image-3.png",
  "/image-4.png",
];

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
