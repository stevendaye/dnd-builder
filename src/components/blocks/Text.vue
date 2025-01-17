<script setup lang="ts">
defineProps<{ msg: string }>();
</script>

<template>
  <div class="text-block">
    <h1>Text Block</h1>
    <p>{{ msg }}</p>
  </div>
</template>

<style scoped>
.text-block {
  background: white;
}
</style>
