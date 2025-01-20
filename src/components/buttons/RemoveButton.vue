<template>
  <button @click="removeBlock(index)">
    <v-icon
      name="md-delete-sharp"
      scale="1.2"
      class="cursor-pointer text-slate-500 hover:text-[#6772e6] transition duration-300"
      title="Delete"
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

const emit = defineEmits(["update:remove"]);

const removeBlock = (index: number) => {
  emit("update:remove", index);
};
</script>
