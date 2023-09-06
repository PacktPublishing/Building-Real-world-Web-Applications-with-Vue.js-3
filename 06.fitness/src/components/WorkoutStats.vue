<script setup lang="ts">
import { computed, onMounted } from "vue";
import { storeToRefs } from "pinia";

import { useFitnessStore } from "@/store/fitness";
const fitnessStore = useFitnessStore();

const { dashboard } = storeToRefs(fitnessStore);

const daysSinceLastWorkout = computed(() => {
  if (!dashboard.value) return 0;
  const lastWorkout = new Date(dashboard.value.last_workout_date);
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - lastWorkout.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
});

onMounted(() => {
  fitnessStore.getDashboard();
});
</script>
<template>
  <v-row>
    <v-col cols="12" sm="3" m="2" class="d-flex justify-space-between">
      <v-card class="align-self-stretch flex-grow-1">
        <v-card-title>{{ daysSinceLastWorkout }}</v-card-title>
        <v-card-text>Days since last workout</v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" sm="3" m="2" class="d-flex justify-space-between">
      <v-card class="align-self-stretch flex-grow-1">
        <v-card-title>{{ dashboard?.total_workouts || 0 }}</v-card-title>
        <v-card-text>Total Exercises</v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" sm="3" m="2" class="d-flex justify-space-between">
      <v-card class="align-self-stretch flex-grow-1">
        <v-card-title>{{ dashboard?.cumulative_weight || 0 }}</v-card-title>
        <v-card-text>Cumulative weight moved</v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" sm="3" m="2" class="d-flex justify-space-between">
      <v-card class="align-self-stretch flex-grow-1">
        <v-card-title>{{
          dashboard?.most_weight_single_workout || 0
        }}</v-card-title>
        <v-card-text>Most weight in a single workout</v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
