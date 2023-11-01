<script setup lang="ts">
import type { Ref } from "vue";
import type { StoryblokProject, StoryBlok } from "@/types/storyblok";

const props = defineProps({
  blok: { type: Object as () => StoryBlok, required: true },
});

const projects: Ref<StoryblokProject[] | null> = ref(null);

const storyblokApi = useStoryblokApi();
const { data } = await storyblokApi.get("cdn/stories", {
  version: "draft",
  starts_with: "portfolio",
  is_startpage: false,
});

const richTextBody = computed(() => renderRichText(props.blok.body));

projects.value = data.stories;
</script>
<template>
  <div>
    <h1 class="mb-4 text-2xl text-primary">
      {{ blok.headline }}
    </h1>
    <div v-html="richTextBody" class="py-4" />
    <div class="grid grid-cols-2 gap-4">
      <UCard
        v-for="project in projects"
        :key="project.uuid"
        class="mx-4 text-center"
      >
        <ULink :to="`/${project.full_slug}`">
          {{ project.content.title }}
          <img
            v-if="project.content.image"
            :src="project.content.image.filename + '/m/300x0'"
            :alt="project.content.image.alt"
          />
        </ULink>
      </UCard>
    </div>
  </div>
</template>

<style scoped>
.grid {
  grid-template-columns: 1fr;
  gap: 1em;
  @media only screen and (min-width: 400px) {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
