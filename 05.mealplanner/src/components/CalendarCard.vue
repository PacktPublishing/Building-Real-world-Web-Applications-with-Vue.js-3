<script setup lang="ts">
import { useFormatDate } from "@/composables/formatters";

const emits = defineEmits(["daySelected"]);

import { usePlannerStore } from "@/stores/planner";
const store = usePlannerStore();

import AppLink from "./AppLink.vue";

interface Today {
  id: number;
  title: string;
  readyInMinutes: number;
}

interface Card {
  date: Date;
  today: Today[];
}

const props = defineProps<{
  card: Card;
}>();

const addRecipeToDay = (card: Card): void => {
  emits("daySelected", card);
};

const removeFromDay = (recipes: { id: number; date: Date }): void => {
  const { id, date } = recipes;
  store.removeRecipeByIdDate({ id, date });
};
</script>
<template>
  <v-sheet class="d-flex justify-space-between">
    <v-sheet class="ma-2 pa-2">
      <h2 class="text-h2">{{ useFormatDate(card.date) }}</h2>
    </v-sheet>
    <v-sheet class="ma-2 pa-2">
      <v-btn text @click="addRecipeToDay(card)" icon="mdi-plus"></v-btn>
    </v-sheet>
  </v-sheet>
  <v-col>
    <v-card v-for="today in card.today" :key="today.id" class="my-4">
      <v-card-title>
        <app-link :to="`/recipe/${today.id}`">{{ today.title }}</app-link>
      </v-card-title>
      <v-card-text>{{ today.readyInMinutes }} minutes</v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text
          icon="mdi-trash-can-outline"
          @click="removeFromDay({ id: today.id, date: card.date })"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>
