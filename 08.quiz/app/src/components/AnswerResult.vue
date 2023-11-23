<script setup lang="ts">
import { computed } from 'vue'
import { state } from '@/socket'
import type { Answer } from '@/types/quiz'

const answers = computed((): Answer[] => {
  return state.quizAnswers
})

const self = computed((): string => {
  return state.selfId
})

const answersList = computed((): string[] => {
  return answers.value[0].currentQuestion.answers
})

const selfCorrect = computed((): boolean => {
  return (
    answers.value.findIndex(
      (answer) =>
        answer.clientId === self.value && answer.answer === answer.currentQuestion.correctAnswer
    ) > -1
  )
})

const selfAnswer = computed((): number => {
  return answers.value.filter((answer) => answer.clientId === self.value)[0].answer
})

const isAnswerCorrect = (index: number): boolean => {
  return index === answers.value[0].currentQuestion.correctAnswer
}
</script>
<template>
  <div>
    <v-card>
      <v-card flat v-if="selfCorrect">
        <v-card-title class="text-success">Yaaasss! 🙌</v-card-title>
        <v-card-text>
          <v-img
            src="https://media2.giphy.com/media/vvbGMpbhZMcHSsD50w/giphy.gif?cid=ecf05e47xazue3yc5jk8gg3jmnwbarcq9knlxagu6us380pw&ep=v1_gifs_search&rid=giphy.gif&ct=g"
          />
        </v-card-text>
      </v-card>
      <v-card flat v-else>
        <v-card-title class="text-error">Big Nope!</v-card-title>
        <v-card-text>
          <v-img
            src="https://media1.giphy.com/media/Yycc82XEuWDaLLi2GV/giphy.gif?cid=ecf05e47e89rqbuhefht5ubna5a5m9i2u3rk1fxwd8hqfvf8&ep=v1_gifs_search&rid=giphy.gif&ct=g"
          />
        </v-card-text>
      </v-card>

      <v-list>
        <v-list-item :key="`answer-${index}`" v-for="(answer, index) in answersList" class="my-2">
          <v-list-item-content>
            <v-list-item-title :class="{ 'font-weight-bold': isAnswerCorrect(index) }">{{
              answer
            }}</v-list-item-title>
          </v-list-item-content>

          <template v-slot:append>
            <v-icon v-if="isAnswerCorrect(index)" icon="mdi-check-bold" color="success"></v-icon>
            <v-icon
              v-if="!isAnswerCorrect(index) && selfAnswer === index"
              icon="mdi-close"
              color="error"
            ></v-icon>
          </template>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>
