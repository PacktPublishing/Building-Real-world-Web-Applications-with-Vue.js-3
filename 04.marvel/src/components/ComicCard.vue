<script setup lang="ts">
import { computed } from "vue";
import type { Comic } from "@/types/marvel";
import CardView from "./CardView.vue";
const props = defineProps<{
  comic: Comic;
}>();

const lf = new Intl.ListFormat("en");
const charactersList = computed(() =>
  props.comic.characters.items.map((c) => c.name)
);
const creatorsList = computed(() =>
  props.comic.creators.items.map((c) => c.name)
);
</script>
<template>
  <CardView>
    <template #header>
      {{ comic.title }}
    </template>
    <template #default>
      <img
        class="aspect-[150/228] shadow-xl float-left mr-4"
        :src="`${comic.thumbnail.path}.${comic.thumbnail.extension}`"
        width="150"
      />
      <dl>
        <dt>Series:</dt>
        <dd>{{ comic.series.name }}</dd>
        <dt v-if="charactersList.length > 0">Characters:</dt>
        <dd v-if="charactersList.length > 0">
          {{ lf.format(charactersList) }}
        </dd>
        <dt v-if="creatorsList.length > 0">Creators:</dt>
        <dd v-if="creatorsList.length > 0">{{ lf.format(creatorsList) }}</dd>
      </dl>
    </template>
  </CardView>
</template>
