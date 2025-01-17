<script setup lang="ts">
defineProps<{ msg: string }>();
</script>

<template>
  <div class="bg-white">
    <h1 class="text-2xl">Image Block</h1>
    <p>{{ msg }}</p>
  </div>
</template>
