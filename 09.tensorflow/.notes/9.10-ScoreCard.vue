<template>
  <v-table>
    <tbody>
      <tr>
        <td>Score:</td>
        <td>{{ score }}</td>
      </tr>
      <tr>
        <td>Categories found:</td>
        <td>{{ objectsFound }}</td>
      </tr>
      <tr>
        <td>Categories skipped:</td>
        <td>{{ skips }}</td>
      </tr>
    </tbody>
  </v-table>
  <div class="mx-2 my-4 text-center" v-if="categoriesPast.length > 0">
    <h3 class="text-h5">Your categories:</h3>
    <v-chip
      v-for="(category, index) in categoriesPast"
      :key="index"
      class="mt-2 mr-2"
      >{{ category }}</v-chip
    >
  </div>
</template>
<script setup lang="ts">
import { useGameStore } from "@/store/game";
import { storeToRefs } from "pinia";
const gameStore = useGameStore();
const { objectsFound, skips, categoriesPast, score } = storeToRefs(gameStore);
</script>
