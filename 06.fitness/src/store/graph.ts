import { defineStore } from 'pinia'
import type { GraphData, GraphDataIterator } from '@/types/graph'
import { useFitnessStore } from "@/store/fitness";
import type { WorkoutFromDatasource } from "@/types/fitness";

export const useGraphStore = defineStore('graph', () => {
  const getWorkouts = async (): Promise<WorkoutFromDatasource | any> => {
    const fitnessStore = useFitnessStore();
    await fitnessStore.getWorkoutsWithSets();
    const workouts: WorkoutFromDatasource | any = fitnessStore.workoutsWithSets;
    return workouts;
  };

  const createGraphData = async (workouts: WorkoutFromDatasource | any) => {
    const monthlyAverages: GraphDataIterator = {};

    for (const entry of workouts) {
      const month = new Date(entry.created_at).toLocaleString('en-US', { month: 'long' });

      for (const set of entry.sets) {
        const { name, color } = set.exercises;
        const weightRepetitions = set.weight * set.repetitions;

        if (!monthlyAverages[name]) {
          monthlyAverages[name] = {
            labels: [],
            datasets: [
              {
                label: name,
                backgroundColor: color,
                data: [],
              },
            ],
          };
        }

        const exerciseData = monthlyAverages[name];
        const monthIndex = exerciseData.labels.indexOf(month);
        if (monthIndex === -1) {
          exerciseData.labels.push(month);
          exerciseData.datasets[0].data.push(weightRepetitions);
        } else {
          exerciseData.datasets[0].data[monthIndex] += weightRepetitions;
        }
      }
    }

    return monthlyAverages;
  };

  const getGraphMonthlyAverage = async () => {
    const workouts = await getWorkouts();
    if (!workouts) return;

    const monthlyAverages = await createGraphData(workouts);

    const datasets = Object.values(monthlyAverages).map((exercise: any) => exercise.datasets[0]);

    const labels = monthlyAverages[Object.keys(monthlyAverages)[0]].labels;
    return { labels, datasets };
  };

  const getGraphPie = async (): Promise<GraphDataIterator | undefined> => {
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

  return { getGraphMonthlyAverage, getGraphPie }
})
