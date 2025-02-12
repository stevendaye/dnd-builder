<template>
  <div class="flex flex-col">
    <div
      class="w-full md:max-w-[650px] h-screen bg-white overflow-y-auto border"
    >
      <p
        class="text-xs lg:text-sm font-InterMedium bg-black p-3 text-white relative rounded-tl-md rounded-tr-md"
      >
        <v-icon
          name="bi-info-circle-fill"
          style="position: absolute; top: 5px; right: 5px"
        />

        In case you delete all blocks, you can always add new ones by clicking
        on the <span class="font-InterBlack">Text</span> or
        <span class="font-InterBlack">Image</span> elements on the left hand
        side.
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
              class="flex gap-2 border px-2 py-3 cursor-move rounded-sm bg-white items-start"
            >
              <DragButton />

              <TextBlock v-if="element.type === 'text'" :element="element" />
              <ImageBlock
                v-if="element.type === 'image'"
                :block-id="index"
                :element="element"
                @update:modal="updateModal"
              />

              <div class="flex items-center flex-row-reverse gap-2 ml-auto">
                <RemoveButton :index="index" @update:remove="removeBlock" />
                <DuplicateButton
                  :index="index"
                  @update:duplicate="duplicateBlock"
                />
              </div>
            </div>
          </template>
        </draggable>
      </div>
    </div>

    <ImagePickerModal
      v-if="isModalOpen"
      :block-id="activeBlockId"
      @update:image="updateImage"
      @update:modal="updateModal"
    />
  </div>
</template>

<script setup lang="ts">
import draggable from "vuedraggable";
import { ref, type PropType } from "vue";
import type { Block } from "../types";
import TextBlock from "./blocks/TextBlock.vue";
import ImageBlock from "./blocks/ImageBlock.vue";
import DragButton from "./buttons/DragButton.vue";
import RemoveButton from "./buttons/RemoveButton.vue";
import DuplicateButton from "./buttons/DuplicateButton.vue";
import ImagePickerModal from "./modals/ImagePickerModal.vue";

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
const isModalOpen = ref<boolean>(false);
const activeBlockId = ref<number>(0);

const updateModal = (data: { blockId: number; open: boolean }) => {
  isModalOpen.value = data.open;
  activeBlockId.value = data.blockId;
};

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

const updateImage = (blockId: number, selectedImage: string) => {
  const updatedList = [...props.list];
  const imageBlock = updatedList[blockId];

  if (!imageBlock) return;

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
  const updatedList = [...props.list];
  const blockToDuplicate = props.list[index];

  if (!blockToDuplicate) return;

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
