<template>
  <div class="flex flex-col gap-2 mt-3 text-xs lg:text-sm">
    <div class="flex items-center gap-2">
      <h2 class="font-semibold">Help Guide</h2>
      <v-icon name="md-livehelp" />
    </div>

    <div class="flex flex-col gap-2">
      <div class="flex gap-2 items-center">
        <v-icon
          name="md-dragindicator-round"
          scale="1.2"
          class="cursor-default text-[#6772e6]"
        />
        <span class="font-InterMedium">Drag Handle (Rearrange)</span>
      </div>
      <div class="flex gap-2 items-center">
        <v-icon
          name="md-delete-sharp"
          scale="1.2"
          class="cursor-default text-[#6772e6]"
        />
        <span class="font-InterMedium">Delete Block</span>
      </div>
      <div class="flex gap-2 items-center">
        <v-icon
          name="hi-duplicate"
          scale="1.2"
          class="cursor-default text-[#6772e6]"
        />
        <span class="font-InterMedium">Duplicate Block</span>
      </div>
      <div class="flex gap-2 items-center">
        <v-icon
          name="oi-image"
          scale="1.2"
          class="cursor-default text-[#6772e6]"
        />
        <span class="font-InterMedium">Click or hover block's image </span>
      </div>
    </div>
  </div>
</template>
