<template>
  <button
    class="w-[42%] text-sm text-white bg-[#1dab65] py-2.5 hover:bg-green-600 rounded-[4px] transition duration-300"
    @click="exportToJSON"
  >
    Save
  </button>
</template>

<script setup lang="ts">
const emit = defineEmits(["update:export"]);

const exportToJSON = () => {
  emit("update:export");
};
</script>
