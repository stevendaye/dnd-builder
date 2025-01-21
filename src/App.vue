<template>
  <div class="flex flex-col overflow-hidden relative">
    <Header />

    <div class="flex bg-[#F1F5F8] w-full h-[calc(100vh-60px)]">
      <div class="flex justify-between w-full">
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

        <div class="w-80 flex flex-col gap-1 bg-white rounded-md p-3">
          <div class="flex flex-col gap-1 mb-3">
            <div class="flex items-center gap-2">
              <h2 class="font-semibold text-xs">Export to JSON</h2>
              <v-icon name="md-savealt-outlined" />
            </div>
            <SaveButton @update:export="exportToJSON" />
          </div>

          <hr />

          <HelpGuide />
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
import SaveButton from "./components/buttons/SaveButton.vue";
import HelpGuide from "./components/commons/HelpGuide.vue";

const assets = ref<string[]>([]);

const list = ref<Block[]>([
  { id: 0, type: "text", text: "Edit text here", order: 1 },
  { id: 1, type: "image", image: "", order: 2 },
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
