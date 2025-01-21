<template>
  <button
    class="w-[75%] sm:w-[50%] lg:w-[30%] text-sm py-3 bg-[#1dab65] text-white hover:bg-green-600 rounded-[4px] transition duration-300 disabled:bg-slate-300 disabled:text-slate-500 font-InterSemiBold"
    :disabled="!selectedImage"
    @click="updateImage(selectedImage)"
  >
    Insert image
  </button>
</template>

<script setup lang="ts">
defineProps({
  selectedImage: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:selectedImage"]);

const updateImage = (img: string) => {
  emit("update:selectedImage", img);
};
</script>
