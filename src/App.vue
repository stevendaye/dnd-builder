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
      <!-- Aside Elements -->
      <div class="flex flex-col gap-1 w-64 bg-white rounded-md pt-3 p-2">
        <!-- Text Element -->
        <div class="flex flex-col gap-1">
          <h3 class="text-xs font-InterMedium px-2">Input</h3>
          <div
            class="flex items-center gap-2 w-full p-2 hover:bg-slate-200 transition duration-300 hover:cursor-pointer rounded-md"
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
              src="./assets/images/image-1.png"
              alt="Predifined Img 1"
              class="size-24 hover:border-2 border-[#1dab65] rounded-md hover:cursor-pointer"
            />
            <img
              src="./assets/images/image-2.png"
              alt="Predifined Img 2"
              class="size-24 hover:border-2 border-[#1dab65] rounded-md hover:cursor-pointer"
            />
            <img
              src="./assets/images/image-3.png"
              alt="Predifined Img 3"
              class="size-24 hover:border-2 border-[#1dab65] rounded-md hover:cursor-pointer"
            />
            <img
              src="./assets/images/image-4.png"
              alt="Predifined Img 3"
              class="size-24 hover:border-2 border-[#1dab65] rounded-md hover:cursor-pointer"
            />
          </div>
        </div>
      </div>

      <!-- Drop Zone -->
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
          @end="dragging = false"
        >
          <template #item="{ element }">
            <div
              :class="`flex gap-2 border px-2 py-3 cursor-move rounded-sm ${
                element.type === 'text' ? 'items-center' : 'items-start'
              }`"
            >
              <v-icon
                name="md-dragindicator-round"
                scale="1.5"
                class="handle cursor-pointer"
              />

              <div v-if="element.type === 'text'" class="w-[50%]">
                <input
                  type="text"
                  class="p-2 bg-[#F3F4F6] w-full"
                  v-model="element.text"
                  placeholder="Edit text"
                />
              </div>
              <div v-if="element.type === 'image'" class="w-[35%]">
                <img
                  src="./assets/images/image-4.png"
                  alt="Predefined Img"
                  class="w-full object-cover"
                />
              </div>
            </div>
          </template>
        </draggable>
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

const dragging = ref<boolean>(false);
const list = ref<Block[]>([
  { id: 0, type: "text", text: "Newsletter", order: 1 },
  { id: 1, type: "text", text: "Campaigns", order: 2 },
  { id: 2, type: "image", image: "./assets/images/image-1.png", order: 3 },
]);
</script>
