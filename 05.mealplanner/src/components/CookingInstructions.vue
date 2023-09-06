<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Ref } from "vue";
import type { Recipe } from "@/types/spoonacular";

import { useRecipeInformation } from "@/composables/recipeApi";

import AppLoader from "./AppLoader.vue";
import RecipeRating from "./RecipeRating.vue";

import { useCacheStore } from "@/stores/cache";
const store = useCacheStore();

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  activePanel: {
    type: Number,
    default: 0,
  },
});

const recipe: Ref<Recipe | null> = ref(null);

const getRecipeDetails = async (id: number): Promise<void> => {
  const cacheKey = `recipe-details-${props.id}`;
  if (store.cachedData(cacheKey)) {
    recipe.value = store.cachedData(cacheKey) as Recipe;
  } else {
    const data = (await useRecipeInformation(id.toString())) as Recipe;
    store.cacheData(cacheKey, data);
    recipe.value = data;
  }
};

const panel = ref<number | null>(props.activePanel);

onMounted(() => {
  getRecipeDetails(props.id);
});
</script>

<template>
  <app-loader v-if="!recipe" />

  <v-container v-else fluid>
    <v-col>
      <v-img height="200" :src="recipe.image" cover v-if="recipe.image" />
      <h1 class="text-h3 ma-4">{{ recipe.title }}</h1>
      
      <recipe-rating :id="recipe.id" />
      
      <v-chip
        class="ma-2 my-4"
        color="primary"
        :key="cuisine"
        v-for="cuisine in recipe.cuisines"
      >
        {{ cuisine }}
      </v-chip>


      <v-expansion-panels variant="accordion" v-model="panel">
        <v-expansion-panel>
          <v-expansion-panel-title class="text-h5"
            >Summary</v-expansion-panel-title
          >
          <v-expansion-panel-text>
            <div v-html="recipe.summary" class="text-body-1"></div>
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-title class="text-h5"
            >Instructions</v-expansion-panel-title
          >
          <v-expansion-panel-text>
            <div v-html="recipe.instructions" class="text-body-1"></div>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
  </v-container>
</template>
