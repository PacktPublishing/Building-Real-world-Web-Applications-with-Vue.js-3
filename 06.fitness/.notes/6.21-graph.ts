import { defineStore } from 'pinia'
import type { GraphData, GraphDataIterator } from '@/types/graph'
import { useFitnessStore } from "@/store/fitness";
import type { WorkoutFromDatasource } from "@/types/fitness";

export const useGraphStore = defineStore('graph', () => {
  const getWorkouts = async (): Promise<WorkoutFromDatasource | any> => {
     // ...abbreviated
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

  // ...abbreviated

  return { getGraphMonthlyAverage, getGraphPie }
})
