import { ref } from 'vue';
import type { Ref } from "vue";
import { defineStore } from 'pinia'
import { useFitnessStore } from "@/store/fitness";
import type { GraphData } from "@/types/graph";
import type { WorkoutFromDatasource } from "@/types/fitness";

export const useGraphStore = defineStore('graph', () => {

  const getWorkouts = async (): Promise<WorkoutFromDatasource | any> => {
    const fitnessStore = useFitnessStore();
    await fitnessStore.getWorkoutsWithSets();
    const workouts: WorkoutFromDatasource | any = fitnessStore.workoutsWithSets;
    return workouts;
  }
  
  const getGraphPie = async (): Promise<GraphData | undefined> => {
    const workouts = await getWorkouts();
    if (!workouts) return;

    const exerciseNames = [];
    const exerciseData = {
      datasets: [{
        backgroundColor: [],
        data: []
      }]
    } as GraphData | any;

    for (const entry of workouts) {
      for (const set of entry.sets) {
        const exerciseName = set.exercises.name;
        const exerciseColor = set.exercises.color;
        const total = set.repetitions;

        const exerciseIndex = exerciseNames.indexOf(exerciseName);
        if (exerciseIndex === -1) {
          exerciseNames.push(exerciseName);
          exerciseData.datasets[0].backgroundColor.push(exerciseColor);
          exerciseData.datasets[0].data.push(total);
        } else {
          exerciseData.datasets[0].data[exerciseIndex] += total;
        }
      }
    }

    return {
      labels: exerciseNames,
      datasets: exerciseData.datasets,
    };
  };

  return { getGraphPie }
});
