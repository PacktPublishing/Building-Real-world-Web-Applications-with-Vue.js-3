import { ref } from 'vue';
import type { Ref } from 'vue';
import { defineStore } from 'pinia';
import { session, supabase } from 'boot/supabase';
import type { Expense, ExpenseWithCategory } from 'src/types/expenses';

export const useExpensesStore = defineStore('expenses', () => {

    const expenses: Ref<Expense[]> = ref([]);

    const getUserId = () => {
        try {
            return session.value?.user?.id
        } catch (error) {
            throw error;
        }
    }

    const getExpenses = async (): Promise<ExpenseWithCategory[] | undefined> => {
        try {
            const id = getUserId();

            const { data, error, status } = await supabase
                .from('expenses')
                .select('amount, description, category_id, categories (name, color)')
                .eq('profile_id', id)

            if (error && status !== 406) throw error;

            if (data) {
                expenses.value = data;
            }
        } catch (error) {
            const { message } = error as Error;
            console.error(message);
        } finally {
            return;
        }
    }
    getExpenses()

    const getExpensesByCategory = async (categoryId: string): Promise<ExpenseWithCategory[] | null | undefined> => {
        try {
            const id = getUserId();
            const { data, error, status } = await supabase
                .from('expenses')
                .select('amount, description, category_id, created_at, categories (name, color)')
                .eq('profile_id', id)
                .eq('category_id', categoryId)

            if (error && status !== 406) throw error;

            return data?.sort((a: { created_at: Date }, b: { created_at: Date }) => {
                return new Date(b.created_at)?.getTime() - new Date(a.created_at)?.getTime() || 0;
            });
        } catch (error) {
            const { message } = error as Error;
            console.error(message);
        }
    }

    const upsertExpense = async (expense: Expense) => {

        const { category_id, amount, description } = expense;
        try {
            const profile_id = getUserId();

            const updates = {
                profile_id,
                created_at: new Date(),
                category_id,
                amount: parseFloat(amount).toFixed(2),
                description,
            };

            const { error } = await supabase.from('expenses').upsert(updates);

            if (error) throw error;
        } catch (error) {
            const { message } = error as Error;
            console.error(message);
        } finally {
            getExpenses()
            return
        }
    }

    return { expenses, getExpenses, getExpensesByCategory, upsertExpense }
});
