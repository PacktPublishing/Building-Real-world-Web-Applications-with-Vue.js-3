<script setup lang="ts">
const emits = defineEmits(["openPreview"]);

import type { Recipe } from "@/types/spoonacular";
interface RecipeList extends Recipe {
  date: Date;
}

const props = defineProps<{
  recipes: RecipeList[];
  title: string;
}>();

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
            </v-sheet>
            <v-sheet class="ma-2 pa-2">
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
