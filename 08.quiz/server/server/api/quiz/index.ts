import type { QuizHead } from '../../../types/quiz';
import { useSupabaseClient } from '../../../composables/supabase';

export default defineEventHandler(async (): Promise<QuizHead[] | null> => {

  console.log("📦 Requesting quizzes from endpoint")

  const { data, error, status } = await useSupabaseClient
    .from(`quiz`)
    .select(`id, created_at`);

  if (error && status !== 406) console.error(error);

  return data
})
