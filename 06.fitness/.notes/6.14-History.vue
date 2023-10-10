<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Ref } from "vue";
import { storeToRefs } from "pinia";

import { useFitnessStore } from "@/store/fitness";
const fitnessStore = useFitnessStore();

const { workouts } = storeToRefs(fitnessStore);

import WorkoutStats from "./WorkoutStats.vue";

const panel: Ref<Number[]> = ref([0]);

const formattedDate = (date: Date): string => {
  if (date) {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  }
  return "";
};

onMounted(() => {
  fitnessStore.getWorkouts({ order: 'descending' });
});
</script>

<template>
  <v-container>
    <workout-stats class="mb-4" />
      <h1>Past workouts</h1>
      <v-expansion-panels v-model="panel" multiple v-if="workouts">
        <v-expansion-panel v-for="workout in workouts" :key="workout.workout_id">
          <v-expansion-panel-title>{{
            formattedDate(new Date(workout.workout_created_at))
          }}</v-expansion-panel-title>
          <v-expansion-panel-text>
          ...
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
  </v-container>
</template>
