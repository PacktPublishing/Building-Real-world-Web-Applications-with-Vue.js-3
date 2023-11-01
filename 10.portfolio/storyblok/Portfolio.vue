<script setup lang="ts">
import { blocklist } from "#tailwind-config";
import type { StoryBlokPortfolio } from "../types/storyblok";

const props = defineProps({
  blok: { type: Object as () => StoryBlokPortfolio, required: true },
});
const richTextBody = computed(() => renderRichText(props.blok.body));

useHead({
  meta: [
    { name: 'description', content: props.blok.description }
  ]
});
</script>

<template>
  <article v-editable="blok">
    <header>
      <h1 class="text-2xl text-primary">{{ blok.title }}</h1>
    </header>
    <img
      v-if="blok.image"
      :src="blok.image.filename + '/m/800x0'"
      :alt="blok.image.alt"
    />
    <div v-html="richTextBody"></div>
    <footer>
      <ULink to="/portfolio" class="text-primary">👈 Back to portfolio</ULink>
    </footer>
  </article>
</template>

<style scoped>
footer {
  margin: 2em 0;
}
</style>