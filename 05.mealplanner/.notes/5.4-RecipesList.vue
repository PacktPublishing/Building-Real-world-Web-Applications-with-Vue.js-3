<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import type { Ref } from "vue";

import type { Recipe } from "@/types/spoonacular";
interface RecipeList extends Recipe {
  date: Date;
}

import RecipeTable from "./RecipeTable.vue";

// return a date in the future:
const addDays = (days: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

// generate some mock data for now:
const recipes = [
  { id: 1, title: "test", date: addDays(1) },
  { id: 2, title: "test2", date: addDays(1) },
  { id: 2, title: "test3", date: addDays(-1) },
];

const openPreview = (recipe: { title: string }): void => {
  console.log(opening recipe ${recipe.title});
};

const pastRecipes = computed(() =>
  recipes.filter((recipe: RecipeList) => {
    const date = new Date(recipe.date);
    return date < new Date();
  })
);

const futureRecipes = computed(
  () =>
    recipes.filter((recipe: RecipeList) => {
      const date = new Date(recipe.date);
      return date >= new Date();
    }) as RecipeList[]
);
const tab: Ref<string> = ref("upcoming");

onMounted(() => {
  if (futureRecipes.value.length === 0) {
    tab.value = "past";
  }
});
</script>
<template>
  <div v-if="pastRecipes.length === 0 && futureRecipes.length === 0">
    No recipes yet. Add some to your planner!
  </div>
  <div v-if="true">
    <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="center">
      <v-tab value="past" :disabled="pastRecipes.length === 0">Past</v-tab>
      <v-tab value="upcoming" :disabled="futureRecipes.length === 0"
        >Upcoming</v-tab
      >
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item key="past" value="past">
        <RecipeTable
          :recipes="pastRecipes"
          title="Past recipes"
          removable
          @openPreview="openPreview"
        />
      </v-window-item>
      <v-window-item key="upcoming" value="upcoming">
        <RecipeTable
          :recipes="futureRecipes"
          title="Upcoming recipes"
          @openPreview="openPreview"
        />
      </v-window-item>
    </v-window>
  </div>
</template>