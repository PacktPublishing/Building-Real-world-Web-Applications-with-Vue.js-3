import type { Question, Quiz, QuizHead } from '@/types/quiz';

export const useQuizStore = defineStore('quiz', () => {

    const quizesLoading: Ref<boolean> = ref(true);
    const quizLoading: Ref<boolean> = ref(true);
    const quizes: Ref<QuizHead[]> = ref([]);
    const quiz: Ref<Quiz[]
        | undefined> = ref(undefined);

    const getQuizes = async (): Promise<QuizHead[] | undefined> => {
        quizesLoading.value = true;
        try {
            const { data, error, status } = await useSupabaseClient
                .from(`quiz`)
                .select(`id, created_at`)

            if (error && status !== 406) throw error;

            if (data) {
                quizes.value = data;
            }
        } catch (error: any) {
            console.error(error.message);
        } finally {
            quizesLoading.value = false;
            return;
        }
    }
    getQuizes()

    const upsertQuiz = async (quiz?: { id: string }) => {
        try {
            const updates = {
                ...quiz,
            };
            console.log(updates)
            const { error } = await useSupabaseClient.from('quiz').upsert(updates);
            if (error) throw error;
        } catch (error: any) {
            console.error(error.message);
        } finally {
            getQuizes();
            return;
        }
    };

    const removeQuiz = async (quizId: string) => {
        try {
            const { error, status } = await useSupabaseClient
                .from('quiz')
                .delete()
                .eq('id', quizId);
            if (error && status !== 406) throw error;
        } catch (error: any) {
            console.error(error.message);
        } finally {
            getQuizes();
        }
    };

    const getQuiz = async (quizId: string): Promise<Quiz[] | undefined> => {
        quizLoading.value = true;
        try {
            const { data, error, status } = await useSupabaseClient
                .from(`quiz`)
                .select(`id, created_at,
                  questions (id, question, answer_1, answer_2, answer_3, answer_4, correct) `)
                .eq('id', quizId);

            if (error && status !== 406) throw error;

            if (data && data.length === 1) {
                quiz.value = data[0];
            }
        } catch (error: any) {
            console.error(error.message);
        } finally {
            quizLoading.value = false;
            return;
        }
    }

    const upsertQuestion = async (quiz_id: { id: string }, question: Question): Promise<void> => {
        try {
            const updates = {
                id: question?.id || undefined,
                question: question.question,
                answer_1: question.answer_1,
                answer_2: question.answer_2,
                answer_3: question.answer_3,
                answer_4: question.answer_4,
                correct: question.correct,
                quiz_id
            };

            console.log(updates)
            const { error } = await useSupabaseClient.from('questions').upsert(updates);
            if (error) throw error;
        } catch (error: any) {
            console.error(error.message);
        } finally {
            return;
        }
    };

    const removeQuestion = async (questionId: string): Promise<void> => {
        try {
            const { error, status } = await useSupabaseClient
                .from('questions')
                .delete()
                .eq('id', questionId);
            if (error && status !== 406) throw error;
        } catch (error: any) {
            console.error(error.message);
        } finally {
            return;
        }
    };

    return { quizesLoading, quizLoading, quizes, getQuizes, upsertQuiz, removeQuiz, quiz, getQuiz, upsertQuestion, removeQuestion }
});
