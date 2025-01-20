<template>
  <div class="flex flex-col gap-2 mt-3">
    <div class="flex items-center gap-2">
      <h2 class="font-semibold text-sm">Help Guide</h2>
      <v-icon name="md-livehelp" />
    </div>

    <div class="flex flex-col gap-2">
      <div class="flex gap-2 items-center">
        <v-icon
          name="md-dragindicator-round"
          scale="1.2"
          class="cursor-default text-[#6772e6]"
        />
        <span class="text-sm">Drag Handle (Rearrange)</span>
      </div>
      <div class="flex gap-2 items-center">
        <v-icon
          name="md-delete-sharp"
          scale="1.2"
          class="cursor-default text-[#6772e6]"
        />
        <span class="text-sm">Delete</span>
      </div>
      <div class="flex gap-2 items-center">
        <v-icon
          name="hi-duplicate"
          scale="1.2"
          class="cursor-default text-[#6772e6]"
        />
        <span class="text-sm">Duplicate</span>
      </div>
    </div>
  </div>
</template>
