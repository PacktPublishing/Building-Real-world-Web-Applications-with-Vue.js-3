<script setup lang="ts">
import { ref, watch } from "vue";
import type { Ref } from "vue";
import { useRecipeSearch } from "@/composables/recipeApi";
import type { RecipeResults } from "@/types/spoonacular";

const emits = defineEmits(["recipeSelected"]);

const searchQuery: Ref<string> = ref("");
const searchResults: Ref<RecipeResults[] | []> = ref([]);

const getSearchResults = async () => {
  const result = await useRecipeSearch(searchQuery.value);
  searchResults.value = result.results;
};

let timeout: ReturnType<typeof setTimeout>;
const debouncedSearch = (): void => {
  clearTimeout(timeout);
  timeout = setTimeout(async () => {
    getSearchResults();
  }, 500);
};

watch(searchQuery, (): void => {
  debouncedSearch();
});

const recipeSelected = (result: RecipeResults): void => {
  emits("recipeSelected", result);
};
</script>

<template>
  <v-card flat>
    <v-card-text>
      <v-text-field v-model="searchQuery" label="Search"></v-text-field>
    </v-card-text>
    <v-divider></v-divider>
    <v-list v-if="searchResults">
      <v-list-item v-for="(result, index) in searchResults" :key="index">
        <v-list-item-title @click="recipeSelected(result)" class="list-item">{{
          result.title
        }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<style scoped>
.list-item {
  cursor: pointer;
}

.list-item:hover,
.list-item:active {
  text-decoration: underline;
}
</style>
