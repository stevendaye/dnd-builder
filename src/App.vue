<template>
  <div class="flex flex-col gap-2 p-12 bg-[#D7F5E7] w-full h-[100vh]">
    <!-- Header -->
    <div class="max-w-[935px] mx-auto text-center">
      <h1 class="text-4xl text-black font-InterBold">
        Drag and Drop
        <span
          style="background-color: rgba(7, 155, 84, 0.5)"
          class="text-white px-4 py-2 rounded-md"
        >
          Builder
        </span>
      </h1>

      <p class="text-[16px] mt-10 mb-3">
        Drag, rearrange, duplicate and delete blocks in the drop zone. Use the
        drag handle icon
        <v-icon name="md-dragindicator-round" scale="1.5" animation="pulse" />
        to rearrange the order of blocks.
      </p>

      <p
        class="text-sm font-InterMedium bg-black p-3 rounded-md text-white relative"
      >
        <v-icon
          name="bi-info-circle-fill"
          style="position: absolute; top: 5px; right: 5px"
        />

        In case you delete all blocks, you can always add new ones by clicking
        on the <span class="font-InterBlack">Text</span> or
        <span class="font-InterBlack">Image</span> elements by the left
        hand-side.
      </p>
    </div>

    <div class="flex justify-center mt-10 gap-2">
      <!-- Elements Section -->
      <div class="flex flex-col gap-1 w-64 bg-white rounded-md pt-3 p-2">
        <!-- Text Element -->
        <div class="flex flex-col gap-1">
          <h3 class="text-xs font-InterMedium px-2">Input</h3>
          <div
            class="flex items-center gap-2 w-full p-2 hover:bg-slate-200 transition duration-300 hover:cursor-pointer rounded-md"
            role="button"
            tabindex=""
            @keydown="addTextBlock"
            @click="addTextBlock"
          >
            <v-icon
              name="co-text"
              scale="2"
              style="
                color: white;
                padding: 5px;
                background: #1dab65;
                border-radius: 4px;
              "
            />
            <p class="text-sm font-inter">Text Element</p>
          </div>
        </div>

        <hr />

        <!-- Image Element -->
        <div class="flex flex-col gap-1">
          <h3 class="text-xs font-InterMedium px-2">Media</h3>
          <div
            class="flex items-center gap-2 w-full p-2 hover:bg-slate-200 transition duration-300 hover:cursor-pointer rounded-md"
          >
            <v-icon
              name="oi-image"
              scale="2"
              style="
                color: white;
                padding: 5px;
                background: #1dab65;
                border-radius: 4px;
              "
            />
            <p class="text-sm font-inter">Image Element</p>
          </div>
        </div>

        <!-- Asset Images -->
        <div class="flex flex-col gap-1 mt-auto pt-3 p-2">
          <h3 class="text-xs font-InterMedium">Asset</h3>
          <p class="text-xs mt-1 mb-2">Select an image to replace</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-1">
            <img
              v-for="img in predifinedImages"
              :src="img"
              alt="Predifined Img 1"
              class="size-24 hover:border-2 border-[#1dab65] rounded-md hover:cursor-pointer"
              @click="updateImage(img)"
            />
          </div>
        </div>
      </div>

      <!-- Drop Zone Section -->
      <div class="w-[675px] h-[600px] bg-white rounded-md pt-3 p-2">
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
                class="handle cursor-pointer"
                title="Hold & Drag"
              />

              <div v-if="element.type === 'text'" class="w-[50%]">
                <input
                  type="text"
                  class="p-2 bg-[#F3F4F6] w-full"
                  v-model="element.text"
                  placeholder="Edit text"
                />
              </div>

              <div v-if="element.type === 'image'" class="w-[30%]">
                <img
                  :src="element.image"
                  alt="Predefined Img"
                  class="w-full object-cover"
                />
              </div>

              <div class="flex items-center flex-row-reverse gap-2 ml-auto">
                <button @click="removeBlock(index)">
                  <v-icon
                    name="md-delete-sharp"
                    scale="1.2"
                    class="cursor-pointer text-slate-500 hover:text-black transition duration-300"
                    title="Delete"
                  />
                </button>
                <button @click="duplicateBlock(index)">
                  <v-icon
                    name="hi-duplicate"
                    scale="1.2"
                    class="cursor-pointer text-slate-500 hover:text-black transition duration-300"
                    title="Duplicate"
                  />
                </button>
              </div>
            </div>
          </template>
        </draggable>
      </div>

      <!-- Save Section -->
      <div class="flex flex-col gap-1 w-44 bg-white rounded-md pt-3 p-2">
        <button
          class="w-full text-white bg-[#1dab65] py-2.5 hover:bg-green-600 rounded-md transition duration-300"
          @click="exportToJSON"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import draggable from "vuedraggable";

interface TextBlock {
  id: number;
  type: "text";
  text: string;
  order: number;
}

interface ImageBlock {
  id: number;
  type: "image";
  image: string;
  order: number;
}

type Block = TextBlock | ImageBlock;

const predifinedImages = [
  "/image-1.png",
  "/image-2.png",
  "/image-3.png",
  "/image-4.png",
];

const dragging = ref<boolean>(false);
const list = ref<Block[]>([
  { id: 0, type: "text", text: "Newsletter", order: 1 },
  { id: 1, type: "image", image: "/image-1.png", order: 2 },
]);

let uniqueIdCounter = list.value.length;

const updateImage = (selectedImage: string) => {
  const imageBlock = list.value.find((block) => block.type === "image");
  if (imageBlock && imageBlock.type === "image") {
    imageBlock.image = selectedImage;
  }
};

const removeBlock = (index: number) => {
  list.value.splice(index, 1);

  // Recalculate block orders after removal
  list.value.forEach((block, i) => {
    block.order = i + 1;
  });
};

const duplicateBlock = (index: number) => {
  const blockToDuplicate = list.value[index];

  const newDuplicatedBlock: Block = {
    ...blockToDuplicate,
    id: ++uniqueIdCounter,
    order: blockToDuplicate.order,
  };

  list.value.splice(index + 1, 0, newDuplicatedBlock);

  // Recalculate block orders after dupliaction
  list.value.forEach((block, i) => {
    block.order = i + 1;
  });
};

const onDragEnd = () => {
  list.value.forEach((block, i) => {
    block.order = i + 1;
  });
};

/* In case all blocks are deleted */
const addTextBlock = () => {
  const newTextBlock: Block = {
    id: ++uniqueIdCounter,
    type: "text",
    text: "Edit text here",
    order: 1,
  };

  list.value.push(newTextBlock);

  list.value.forEach((block, i) => {
    block.order = i + 1;
  });
};

const exportToJSON = () => {
  const jsonFormat = JSON.stringify(list.value, null, 2);
  console.log(jsonFormat);
};
</script>
