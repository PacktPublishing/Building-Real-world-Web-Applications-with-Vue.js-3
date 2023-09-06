<script setup lang="ts">
import { PropType, computed} from "vue";
import { storeToRefs } from "pinia";

import { useFitnessStore } from '@/store/fitness'
import GroupedExerciseView from "./GroupedExerciseView.vue";

const fitnessStore = useFitnessStore()

const { exercises } = storeToRefs(fitnessStore)


interface Routine {
  weight: Number;
  repetitions: Number;
}

const props = defineProps({
  exerciseId: {
    type: String,
    required: true,
  },
  routines: {
    type: Array as PropType<Routine[]>,
    required: true,
  },
});

const exerciseIdToName = (id: string): string => {
  const exercise = exercises?.value?.find(
    (exercise: any) => exercise.id === id
  );
  return exercise?.name ? exercise.name : "Unknown";
};

const exercise = computed(() => (
  props.routines.map((routine: Routine) => ({
    exercise_name: exerciseIdToName(props.exerciseId),
    sets_weight: routine.weight as number,
    sets_repetitions: routine.repetitions as number,
  })
)));
</script>
<template>
  <grouped-exercise-view :exercise="exercise" v-if="exercise" />
</template>
