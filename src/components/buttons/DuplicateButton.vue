<template>
  <button @click="duplicateBlock(index)">
    <v-icon
      name="hi-duplicate"
      scale="1.2"
      class="cursor-pointer text-slate-500 hover:text-[#6772e6] transition duration-300"
      title="Duplicate"
    />
  </button>
</template>

<script setup lang="ts">
defineProps({
  index: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["update:duplicate"]);

const duplicateBlock = (index: number) => {
  emit("update:duplicate", index);
};
</script>
