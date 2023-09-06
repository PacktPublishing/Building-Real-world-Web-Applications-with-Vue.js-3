import { ref } from "vue";
import type { Ref } from "vue";
import { defineStore } from "pinia";

import { useUserStore } from "@/store/user";

import type { Workout, Exercise, Set, Dashboard, WorkoutFromDatasource, WorkoutViewFromDatasource } from "@/types/fitness";

import { useSupabaseClient } from "@/composables/supabase";

export const useFitnessStore = defineStore('fitness', () => {

    const exercises: Ref<Exercise[]> = ref([]);

    const getExercises = async (): Promise<Exercise[] | undefined> => {
        try {
            const { data, error, status } = await useSupabaseClient
                .from("exercises")
                .select(`id, name, color, created_at`);

            if (error && status !== 406) throw error;

            if (data) {
                exercises.value = data
                return data
            }
        } catch (error: any) {
            console.error(error.message);
        }
    }
    getExercises()

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
                await getDashboard()
                await getWorkouts({ order: 'descending' })
            }
        } catch (error: any) {
            console.error(error.message);
        }
    }


    const workouts: Ref<WorkoutViewFromDatasource[] | []> = ref([]);

    type GetWorkoutsOptions = {
        order: string;
    }
    const getWorkouts = async (options: GetWorkoutsOptions = { order: 'ascending' }): Promise<void> => {
        try {

            const userStore = useUserStore()
            const { session } = userStore

            if (session?.user?.id === undefined) return
            const { id } = session.user;

            const order = { ascending: options.order === 'ascending' }

            const { data, error, status }: any = await useSupabaseClient
                .from('workout_history_view')
                .select()
                .eq('profile_id', id)
                .order('workout_created_at', order)

            if (error && status !== 406) throw error

            if (data) {
                workouts.value = data
            }
        } catch (error: any) {
            console.error(error.message);
        }
    }

    const workoutsWithSets: Ref<WorkoutFromDatasource | []> = ref([]);

    const getWorkoutsWithSets = async (options: GetWorkoutsOptions = { order: 'ascending' }): Promise<void> => {
        try {

            const userStore = useUserStore()
            const { session } = userStore

            if (session?.user?.id === undefined) return
            const { id } = session.user;

            const order = { ascending: options.order === 'ascending' }

            const { data, error, status }: any = await useSupabaseClient
                .from('workouts')
                .select(`
                  id, created_at,
                  sets (
                    workout_id, weight, repetitions,
                    exercises ( name, color ) 
                  )
                `)
                .eq('profile_id', id)
                .order('created_at', order)

            if (error && status !== 406) throw error

            if (data) {
                workoutsWithSets.value = data
            }
        } catch (error: any) {
            console.error(error.message);
        }
    }

    const dashboard: Ref<Dashboard | undefined> = ref();

    const getDashboard = async (): Promise<void> => {
        try {

            const userStore = useUserStore()
            const { session } = userStore

            if (session?.user?.id === undefined) return
            const { id } = session.user;

            const { data, error, status }: any = await useSupabaseClient
                .from('workout_dashboard_view')
                .select()
                .eq('profile_id', id)

            if (error && status !== 406) throw error

            if (data && data.length === 1) {
                dashboard.value = data[0]
            }
        } catch (error: any) {
            console.error(error.message);
        }
    }
    getDashboard()

    return { exercises, getExercises, saveWorkout, workouts, getWorkouts, dashboard, getDashboard, workoutsWithSets, getWorkoutsWithSets }
});
