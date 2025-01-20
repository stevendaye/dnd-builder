<template>
  <div
    class="flex items-center gap-2 w-full p-2 hover:bg-[#F3F4F6] transition duration-300 hover:cursor-pointer rounded-md"
    role="button"
    tabindex=""
    @keydown="addBlock"
    @click="addBlock"
  >
    <v-icon
      :name="icon"
      scale="1.5"
      style="
        color: white;
        padding: 5px;
        background: #6772e6;
        border-radius: 4px;
      "
    />
    <p class="text-sm font-inter">{{ blockType }}</p>
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
