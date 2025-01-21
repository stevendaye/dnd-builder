<template>
  <div
    class="flex items-center absolute top-1.5 right-2 py-1 px-3 rounded-[4px] hover:bg-[#6772e6] transition duration-300 hover:cursor-pointer hover:text-white"
    role="button"
    tabindex=""
    @keydown="closeModal"
    @click="closeModal"
  >
    <span class="text-sm">Close</span>
    <v-icon name="io-close" scale="1.5" />
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["update:modal"]);

const closeModal = () => {
  emit("update:modal");
};
</script>
