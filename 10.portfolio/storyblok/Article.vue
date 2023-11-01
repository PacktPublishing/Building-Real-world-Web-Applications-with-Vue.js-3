<script setup lang="ts">
defineProps({
  blok: { type: Object as () => { title: string, content: any}, required: true },
});
</script>

<template>
  <div v-editable="blok" class="article">
    <h2 v-if="blok.title" class="text-2xl mb-4">{{ blok.title }}</h2>
    <StoryblokComponent
      v-for="blok in blok.content"
      :key="blok._uid"
      :blok="blok"
    />
  </div>
</template>

<style scoped>
.article {
  max-width: 720px;
  margin: 2em auto;
}
</style>
