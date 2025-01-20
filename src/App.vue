<template>
  <div class="flex flex-col overflow-hidden">
    <Header />

    <div class="flex bg-[#F1F5F8] w-full h-[calc(100vh-60px)] relative">
      <div class="flex justify-between w-full">
        <!-- Left Handside Section -->
        <div class="flex flex-col gap-1 w-72 bg-white rounded-md p-3">
          <TextElement
            :unique-id-counter="uniqueIdCounter"
            :list="list"
            @update:unique-id-counter="updateIdCounter"
            @update:list="updateList"
          />

          <hr />

          <ImageElement
            :unique-id-counter="uniqueIdCounter"
            :list="list"
            @update:unique-id-counter="updateIdCounter"
            @update:list="updateList"
          />

          <MediaAssets :assets="assets" />
        </div>

        <Editor
          :unique-id-counter="uniqueIdCounter"
          :assets="assets"
          :list="list"
          @update:unique-id-counter="updateIdCounter"
          @update:assets="updateAssets"
          @update:list="updateList"
        />

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

import type { Block } from "./types";

import Header from "./components/layout/Header.vue";
import TextElement from "./components/elements/TextElement.vue";
import ImageElement from "./components/elements/ImageElement.vue";
import MediaAssets from "./components/elements/MediaAssets.vue";
import Editor from "./components/Editor.vue";

const assets = ref<string[]>(["/image-1.png"]);

const list = ref<Block[]>([
  { id: 0, type: "text", text: "Edit text here", order: 1 },
  { id: 1, type: "image", image: "/image-1.png", order: 2 },
]);

let uniqueIdCounter = ref<number>(list.value.length);

// Emitted Events
const updateIdCounter = (newId: number) => {
  uniqueIdCounter.value = newId;
};

const updateList = (newList: Block[]) => {
  list.value = newList;
};

const updateAssets = (newAssets: string[]) => {
  assets.value = newAssets;
};

const exportToJSON = () => {
  const jsonFormat = JSON.stringify(list.value, null, 2);
  console.log(jsonFormat);
};
</script>
