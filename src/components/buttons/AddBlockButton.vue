<template>
  <div
    class="flex items-center gap-2 w-full p-2 hover:bg-[#D7F5E7] transition duration-300 hover:cursor-pointer rounded-md"
    role="button"
    tabindex=""
    @keydown="addBlock"
    @click="addBlock"
  >
    <v-icon
      :name="icon"
      scale="1.5"
      style="color: white; padding: 5px; background: black; border-radius: 4px"
    />
    <p class="text-xs lg:text-sm font-inter hidden lg:block">{{ blockType }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps({
  icon: {
    type: String,
    required: true,
  },
  blockType: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:add"]);

const addBlock = () => {
  emit("update:add");
};
</script>
