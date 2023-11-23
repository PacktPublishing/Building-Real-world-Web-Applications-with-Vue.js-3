<script setup lang="ts">
import { computed } from 'vue'
import { state } from '@/socket'

import QuestionForm from '@/components/QuestionForm.vue';
import QuizTimer from '@/components/QuizTimer.vue';

const question = computed(() => {
  return state.quizCurrentQuestion
})
</script>

<template>
  <div class="my-8">
    <h1 class="text-h3 mb-8">{{ question.question }}</h1>
    <QuestionForm />
  </div>
  <v-bottom-navigation class="bg-secondary pa-4"><quiz-timer class="mx-auto"/></v-bottom-navigation>
</template>
