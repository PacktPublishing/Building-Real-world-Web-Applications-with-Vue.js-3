<script setup lang="ts">
// import { usePlannerStore } from "@/stores/modules/planner";
const emits = defineEmits(["openPreview"]);

// const store = usePlannerStore();

import type { Recipe } from "@/types/spoonacular";
interface RecipeList extends Recipe {
  date: Date;
}

// import ItemRating from "./ItemRating.vue";

const props = defineProps<{
  recipes: RecipeList[];
  title: string;
//   removable?: boolean; 
}>();

// const removeFromDay = (recipes: { id: number; date: Date }): void => {
//   const { id, date } = recipes;
//   store.removeRecipeByIdDate({ id, date });
// };

const openPreview = (recipe: Recipe): void => {
  emits("openPreview", recipe);
};
</script>
<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">{{ title }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="recipe in recipes" :key="recipe.id">
        <td class="py-4">
          <v-sheet class="d-flex justify-space-between">
            <v-sheet class="ma-2 pa-2">
              <h2 class="text-h4">{{ recipe.title }}</h2>
              <!-- <ItemRating :id="recipe.id" /> -->
            </v-sheet>
            <v-sheet class="ma-2 pa-2">
              <!-- <v-btn
                v-if="removable"
                @click="removeFromDay({ id: recipe.id, date: recipe.date })"
                text-color="red"
                icon="mdi-trash-can-outline" class="mr-4"></v-btn> -->
              <v-btn
                @click="openPreview(recipe)"
                text-color="light-green"
                icon="mdi-book-open"
              ></v-btn>
            </v-sheet>
          </v-sheet>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>
