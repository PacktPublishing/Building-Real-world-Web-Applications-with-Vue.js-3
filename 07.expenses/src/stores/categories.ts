import { ref } from 'vue';
import type { Ref } from 'vue';
import { defineStore } from 'pinia';
import { session, supabase } from 'boot/supabase';
import type { Category } from 'src/types/categories';

export const useCategoriesStore = defineStore('categories', () => {

    const categories: Ref<Category[]> = ref([]);

    const getUserId = (): string | undefined => {
        try {
            return session.value?.user?.id
        } catch (error) {
            throw error;
        }
    }

    const getCategories = async (): Promise<Category[] | undefined> => {
        try {
            const id = getUserId();

            const { data, error, status } = await supabase
                .from('categories')
                .select('*')
                .or(`profile_id.eq.${id}, profile_id.is.${null}`);

            if (error && status !== 406) throw error;

            if (data) {
                categories.value = data;
            }
        } catch (error: unknown) {
            const { message } = error as Error;
            console.error(message);
        } finally {
            return;
        }
    }
    getCategories()

    const upsertCategory = async (category: Category) => {
        const { id, name, color } = category;
        try {
            const profile_id = getUserId();

            const updates = {
                profile_id,
                name,
                color,
                id,
            };

            console.log('UPDATES', updates)
            const { error } = await supabase.from('categories').upsert(updates);
            if (error) throw error;
        } catch (error: unknown) {
            const { message } = error as Error;
            console.error(message);
        } finally {
            getCategories();
            return;
        }
    };

    const removeCategory = async (categoryId: string) => {
        try {
            const { error, status } = await supabase
                .from('categories')
                .delete()
                .eq('id', categoryId);
            if (error && status !== 406) throw error;
        } catch (error: unknown) {
            const { message } = error as Error;
            console.error(message);
        } finally {
            getCategories();
        }
    };

    return { categories, getCategories, upsertCategory, removeCategory }
});
