// …abbreviated
import { useUserStore } from "@/store/user";
import type { Workout, Exercise, Set, WorkoutFromDatasource } from "@/types/fitness";

// ...abbreviated

export const useFitnessStore = defineStore('fitness', () => {

  // ...abbreviated

    const insertWorkout = async (date: Date, profile_id: string): Promise<string> => {
        try {
            const { data, error } = await useSupabaseClient
                .from('workouts')
                .insert({ created_at: date, profile_id })
                .select()

            if (error) throw error;
            const workoutId = data?.[0].id
            return workoutId
        } catch (error: any) {
            console.error(error.message);
            return error;
        }
    }

    const insertSets = async (sets: Set[]): Promise<void> => {
        try {
            const { error } = await useSupabaseClient
                .from('sets')
                .insert(sets)

            if (error) throw error;
        } catch (error: any) {
            console.error(error.message);
            return error;
        }
    }

    const saveWorkout = async (workout: Workout): Promise<void> => {

        const userStore = useUserStore()
        const { session } = userStore

        if (session?.user?.id === undefined) return
        const { id } = session.user;

        try {
            const workoutId = await insertWorkout(workout.date, id)
            if (workoutId) {
                const sets = [];

                for (const routine of workout.routines) {
                    for (const innerRoutine of routine.routines) {
                        sets.push({
                            exercise_id: routine.exercise || '',
                            workout_id: workoutId,
                            profile_id: id,
                            weight: innerRoutine.weight,
                            repetitions: innerRoutine.repetitions
                        });
                    }
                }

                await insertSets(sets);
            }
        } catch (error: any) {
            console.error(error.message);
        }
    }

    return { exercises, getExercises, saveWorkout }
});
