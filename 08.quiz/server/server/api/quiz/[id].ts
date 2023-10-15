import { useSupabaseClient } from '../../../composables/supabase';
import type { Quiz, QuizQuestion } from '../../../types/quiz';
export default defineEventHandler(async (event) => {

  const { id } = event.context.params as { id: string }
  console.log("📦 Requesting quiz id", id)

  const { data, error, status } = await useSupabaseClient
    .from(`quiz`)
    .select(`id, created_at,
          questions (question, answer_1, answer_2, answer_3, answer_4, correct) `)
    .eq('id', id);

  if (error && status !== 406) console.error(error);

  return data ? transformQuestions(data) : null
})

const transformQuestions = (input: Quiz[]): QuizQuestion[] => {
  return input.map(item => {
    const { questions } = item;
    return questions.map(question => {
      const { question: q, correct, ...answers } = question;
      const answerArray = Object.values(answers);
      return {
        question: q,
        answers: answerArray,
        correctAnswer: correct,
      };
    });
  }).flat();
}
