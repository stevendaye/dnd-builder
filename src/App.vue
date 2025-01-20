<template>
  <div class="flex flex-col overflow-hidden">
    <div class="flex justify-start items-center w-full py-4 pl-5 bg-[#D7F5E7]">
      <h1 class="text-[16px] text-black font-InterBold">
        Drag and Drop
        <span
          style="background-color: rgba(7, 155, 84, 0.5)"
          class="text-white px-2 py-1 rounded-md"
        >
          Builder
        </span>
      </h1>
    </div>

    <div class="flex bg-[#F1F5F8] w-full h-[calc(100vh-60px)] relative">
      <div class="flex justify-between w-full">
        <!-- Elements Section -->
        <div class="flex flex-col gap-1 w-72 bg-white rounded-md p-3">
          <!-- Text Element -->
          <div class="flex flex-col gap-1">
            <h3 class="text-xs font-InterMedium px-2">Input</h3>
            <div
              class="flex items-center gap-2 w-full p-2 hover:bg-[#F3F4F6] transition duration-300 hover:cursor-pointer rounded-md"
              role="button"
              tabindex=""
              @keydown="addTextBlock"
              @click="addTextBlock"
            >
              <v-icon
                name="co-text"
                scale="1.5"
                style="
                  color: white;
                  padding: 5px;
                  background: #6772e6;
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

          <!-- Asset Images -->
          <div class="flex flex-col gap-1 mt-auto p-2 bg-[#D7F5E7] rounded-md">
            <h3 class="text-sm font-InterMedium">Media Asset</h3>
            <p class="text-xs mt-1 mb-2">Your recent working images</p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <img
                v-for="img in assets"
                :src="img"
                alt="Predifined Img 1"
                class="size-32 hover:border-2 border-[#1dab65] rounded-md hover:cursor-select"
              />
            </div>
          </div>
        </div>

        <!-- Drop Zone Section -->
        <div class="w-[650px] h-screen bg-white overflow-y-auto border">
          <p class="text-sm font-InterMedium bg-black p-3 text-white relative">
            <v-icon
              name="bi-info-circle-fill"
              style="position: absolute; top: 5px; right: 5px"
            />

            In case you delete all blocks, you can always add new ones by
            clicking on the <span class="font-InterBlack">Text</span> or
            <span class="font-InterBlack">Image</span> elements by the left
            hand-side.
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

        <!-- Utility Section -->
        <div class="w-80 flex flex-col gap-1 bg-white rounded-md p-3">
          <div class="flex flex-col gap-1 mb-3">
            <div class="flex items-center gap-2">
              <h2 class="font-semibold text-xs">Export to JSON</h2>
              <v-icon name="md-savealt-outlined" />
            </div>
            <button
              class="w-[42%] text-sm text-white bg-[#1dab65] py-2.5 hover:bg-green-600 rounded-[4px] transition duration-300"
              @click="exportToJSON"
            >
              Save
            </button>
          </div>

          <hr />

          <div class="flex flex-col gap-2 mt-3">
            <div class="flex items-center gap-2">
              <h2 class="font-semibold text-sm">Help Guide</h2>
              <v-icon name="md-livehelp" />
            </div>

            <div class="flex flex-col gap-2">
              <div class="flex gap-2 items-center">
                <v-icon
                  name="md-dragindicator-round"
                  scale="1.2"
                  class="cursor-pointer text-[#6772e6]"
                />
                <span class="text-sm">Drag Handle (Rearrange)</span>
              </div>
              <div class="flex gap-2 items-center">
                <v-icon
                  name="md-delete-sharp"
                  scale="1.2"
                  class="cursor-pointer text-[#6772e6]"
                />
                <span class="text-sm">Delete</span>
              </div>
              <div class="flex gap-2 items-center">
                <v-icon
                  name="hi-duplicate"
                  scale="1.2"
                  class="cursor-pointer text-[#6772e6]"
                />
                <span class="text-sm">Duplicate</span>
              </div>
            </div>
          </div>
        </div>
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

const predifinedImages: string[] = [
  "/image-1.png",
  "/image-2.png",
  "/image-3.png",
  "/image-4.png",
];
const assets = ref<string[]>(["/image-1.png"]);

const list = ref<Block[]>([
  { id: 0, type: "text", text: "Edit text here", order: 1 },
  { id: 1, type: "image", image: "/image-1.png", order: 2 },
]);

let uniqueIdCounter = list.value.length;

const updateAssets = (img: string) => {
  assets.value.push(img);
};

const updateImage = (index: number, selectedImage: string) => {
  const imageBlock = list.value[index];
  if (imageBlock && imageBlock.type === "image") {
    imageBlock.image = selectedImage;
  }

  if (!assets.value.includes(selectedImage)) {
    updateAssets(selectedImage);
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

const addImageBlock = () => {
  const newImageBlock: Block = {
    id: ++uniqueIdCounter,
    type: "image",
    image: "/image-1.png",
    order: 1,
  };

  list.value.push(newImageBlock);

  list.value.forEach((block, i) => {
    block.order = i + 1;
  });
};

const exportToJSON = () => {
  const jsonFormat = JSON.stringify(list.value, null, 2);
  console.log(jsonFormat);
};
</script>
