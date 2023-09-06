<script setup lang="ts">
import { PropType } from "vue";

interface Exercise {
  exerciseName: string;
  routines: {
    weight: Number;
    repetitions: Number;
  }[];
}

defineProps({
  exercise: {
    type: Object as PropType<Exercise>,
    required: true,
  },
});
</script>
<template>
  <v-col cols="12">
    <v-row>
      <v-col cols="12"
        ><h5 class="text-h5">{{ exercise.exerciseName }}</h5></v-col
      ></v-row
    >
    <v-row v-for="(routine, index) in exercise.routines" :key="index">
      <v-col cols="6">{{ routine.weight }}</v-col>
      <v-col cols="6">{{ routine.repetitions }}</v-col>
    </v-row>
  </v-col>
</template>
