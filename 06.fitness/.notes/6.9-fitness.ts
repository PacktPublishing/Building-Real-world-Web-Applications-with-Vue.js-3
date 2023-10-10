import { ref } from "vue";
import type { Ref } from "vue";
import { defineStore } from "pinia";

import type { Exercise } from "@/types/fitness";

import { useSupabaseClient } from "@/composables/supabase";

export const useFitnessStore = defineStore('fitness', () => {

    const exercises: Ref<Exercise[]> = ref([]);

    const getExercises = async (): Promise<Exercise[] | undefined> => {
        try {
            const { data, error, status } = await useSupabaseClient
                .from("exercises")
                .select(id, name, color, created_at);

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

    return { exercises, getExercises }
});
