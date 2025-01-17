<script setup lang="ts">
defineProps<{ msg: string }>();
</script>

<template>
  <div class="image-block">
    <h1>Image Block</h1>
    <p>{{ msg }}</p>
  </div>
</template>

<style scoped>
.image-block {
  background: white;
}
</style>
