<template>
  <div
    class="w-full h-full absolute top-0 left-0 flex flex-col items-center justify-center"
    style="background: rgba(0, 0, 0, 0.9)"
  >
    <div
      class="w-[45%] h-auto flex flex-col justify-center items-center bg-white rounded-md px-5 py-10 gap-4 relative"
    >
      <CloseButton @update:modal="closeModal" />

      <h1 class="text-2xl font-InterBold text-center">Select Image</h1>
      <h3 class="text-sm w-[65%] text-center">
        You need to select an image below in order to update the imgae of the
        block you selected
      </h3>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div v-for="img in predifinedImages" class="size-52">
          <img
            :src="img"
            alt="Predifined Img 1"
            :class="`w-full h-full object-cover hover:border-2 border-[#1dab65] rounded-md hover:cursor-pointer p-1 ${
              selectedImage === img && 'border-2 border-[#1dab65]'
            }`"
            @click="selectImage(img)"
          />
        </div>
      </div>

      <InsertImageButton
        :selected-image="selectedImage"
        @update:selected-image="updateImage"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CloseButton from "../buttons/CloseButton.vue";
import InsertImageButton from "../buttons/InsertImageButton.vue";

const props = defineProps({
  blockId: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["update:image", "update:modal"]);

const predifinedImages: string[] = [
  "/image-1.png",
  "/image-2.png",
  "/image-3.png",
  "/image-4.png",
];

const selectedImage = ref<string>("");

const selectImage = (img: string) => {
  selectedImage.value = img;
};

const closeModal = () => {
  emit("update:modal", { blockId: 0, open: false });
};

const updateImage = (img: string) => {
  emit("update:image", props.blockId, img);
  closeModal();
};
</script>
