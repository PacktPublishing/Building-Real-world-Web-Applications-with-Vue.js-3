import { ref } from "vue";
import type { Ref } from "vue";
import { defineStore } from "pinia";

import { useUserStore } from "@/store/user";

import type { Workout, Exercise, Set, Dashboard } from "@/types/fitness";

import { useSupabaseClient } from "@/composables/supabase";

export const useFitnessStore = defineStore('fitness', () => {

    // ...abbreviated

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

    return { exercises, getExercises, saveWorkout, dashboard, getDashboard }
});
