<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Ref } from 'vue';
import type { QuizHead} from '@/types/quiz';

const quizes: Ref<QuizHead[]> = ref([])

const getQuizes = async (): Promise<QuizHead[]> => {
  const data = await fetch('http://localhost:3000/api/quiz/')
  const quizes = await data.json()
  return quizes
}

onMounted(async () => {
  quizes.value = await getQuizes()
})
</script>

<template>
  <v-progress-circular
    v-if="!quizes"
    indeterminate
    color="primary"
    class="mx-auto my-8"
  ></v-progress-circular>
  <v-card class="mx-auto" max-width="600" v-else>
    <v-list>
      <v-list-item v-for="(quiz, index) in quizes" :key="index">
        <v-list-item-title
          ><router-link :to="`/start/${quiz.id}`"
            ><v-btn flat>
              {{ quiz.id }}
            </v-btn>
          </router-link></v-list-item-title
        >
      </v-list-item>
    </v-list>
  </v-card>
</template>
