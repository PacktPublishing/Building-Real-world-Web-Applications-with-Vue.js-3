<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import type { Ref } from "vue";
import type { WorkoutViewFromDatasource } from "@/types/fitness";

// ...abbreviated

interface Set {
  profile_id: string;
  workout_id: string;
  workout_created_at: string;
  exercise_name: string;
  sets_weight: number;
  sets_repetitions: number;
}

interface Workouts {
  workout_id: string;
  workout_created_at: string;
  sets: Set[];
}

const workoutsById = (workouts: WorkoutViewFromDatasource[]) =>
  workouts.reduce((acc: { [key: string]: Workouts }, curr: Set) => {
    if (!acc[curr.workout_id])
      acc[curr.workout_id] = {
        workout_id: curr.workout_id,
        workout_created_at: curr.workout_created_at,
        sets: [],
      };
    acc[curr.workout_id].sets.push(curr);
    return acc;
  }, {});

const setsByExerciseName = (sets: Set[]) =>
  sets.reduce((acc: { [key: string]: Set[] }, curr: Set) => {
    if (!acc[curr.exercise_name]) acc[curr.exercise_name] = [];
    acc[curr.exercise_name].push(curr);
    return acc;
  }, {});

const workoutIds = computed(() => Object.keys(workoutsById(workouts.value)));

const workoutsGroupedById = computed(() => workoutsById(workouts.value));

// ...abbreviated
</script>
<template>
  <v-container>
    <workout-stats class="mb-4" />
    <h1>Past workouts</h1>
    <v-expansion-panels v-model="panel" multiple v-if="workouts">
      <v-expansion-panel v-for="id in workoutIds" :key="id">
        <v-expansion-panel-title
          >{{
            formattedDate(new Date(workoutsGroupedById[id].workout_created_at))
          }}
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          {{ workoutsGroupedById[id].sets }}
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>
