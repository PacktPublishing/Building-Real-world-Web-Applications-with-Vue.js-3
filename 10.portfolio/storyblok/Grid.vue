<script setup lang="ts">
defineProps({
  blok: {
    type: Object as () => { columns: any },
    required: true,
  },
});
</script>

<template>
  <div v-editable="blok" v-if="blok" class="flex mx-auto">
    <StoryblokComponent
      v-for="blok in blok.columns"
      :key="blok._uid"
      :blok="blok"
    />
  </div>
</template>
