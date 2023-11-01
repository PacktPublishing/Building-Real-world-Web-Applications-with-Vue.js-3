<script setup lang="ts">
const { slug } = useRoute().params as { slug: string[] };

const page = slug && slug.length > 0 ? slug.join("/") : "home"

const story = await useAsyncStoryblok(page,
  {
    version: "draft",
  }
);
</script>

<template>
  <div :class="page" class="page">
    <StoryblokComponent v-if="story" :blok="story.content" />
  </div>
</template>

<style>
.page {
  max-width: 720px;
  margin: 0 auto;
}
.home {
  display: flex;
  justify-content: center;
  margin: 0 auto 4em auto;

  .heading {
    font-size: 6em;
    font-weight: 800;
    text-align: center;
  }

  .prose {
    max-width: 20em;
    font-size: 2em;
    line-height: 1.4em;
    margin: 1em auto 2em;
  }
}
</style>