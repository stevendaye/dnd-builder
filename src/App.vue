<script setup lang="ts">
import Text from "./components/blocks/Text.vue";
import Image from "./components/blocks/Image.vue";
</script>

<template>
  <div class="block">
    <Text msg="Text" />
    <Image msg="Image" />
  </div>
</template>

<style scoped>
.blocks {
  background: white;
}
</style>
