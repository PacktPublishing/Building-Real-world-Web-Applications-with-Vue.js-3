import { ref } from "vue";
import type { Ref } from "vue";
import { defineStore } from "pinia";

import { useUserStore } from "@/store/user";

import type { Workout, Exercise, Set, Dashboard, WorkoutFromDatasource } from "@/types/fitness";

import { useSupabaseClient } from "@/composables/supabase";

export const useFitnessStore = defineStore('fitness', () => {

    // ...abbreviated

    const workouts: Ref<WorkoutFromDatasource | []> = ref([]);

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
    getWorkouts({ order: 'descending' })

    // ...abbreviated

    return { exercises, getExercises, saveWorkout, workouts, getWorkouts, dashboard, getDashboard }
});
