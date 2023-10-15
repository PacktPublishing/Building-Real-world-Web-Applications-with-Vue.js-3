<script setup lang="ts">
import { onMounted } from "vue";
import { useQuizStore } from "@/stores/quiz";
import { storeToRefs } from "pinia";

const quizStore = useQuizStore();

const { quizesLoading } = storeToRefs(quizStore);

const removeQuiz = async (id: string): Promise<void> => {
  await quizStore.removeQuiz(id);
  await quizStore.getQuizes();
};

const addQuiz = async (): Promise<void> => {
  await quizStore.upsertQuiz();
  await quizStore.getQuizes();
};

onMounted(() => async (): Promise<void> => {
  await quizStore.getQuizes();
});
</script>
<template>
  <div class="my-8">
    <h1 class="text-h3 mb-8">Choose quiz to edit</h1>

    <v-progress-circular
      v-if="quizesLoading"
      indeterminate
      color="primary"
      class="mx-auto my-8"
    ></v-progress-circular>

    <v-card class="mx-auto" max-width="600" v-else>
      <v-list>
        <v-list-item v-for="quiz in quizStore.quizes" :key="quiz.id">
          <v-list-item-title
            ><nuxt-link :to="`/quiz/${quiz.id}`"
              ><v-btn flat>
                {{ quiz.id }}
              </v-btn>
            </nuxt-link></v-list-item-title
          >
          <template v-slot:append>
            <v-btn
              v-if="quiz.id"
              color="grey-lighten-1"
              icon="mdi-delete-outline"
              variant="text"
              @click="removeQuiz(quiz.id)"
            ></v-btn>
          </template>
        </v-list-item>
      </v-list>
      <v-divider />
      <v-card-actions>
        <v-btn @click="addQuiz" primary class="my-4 mx-4"
          >✨ Create new Quiz</v-btn
        >
      </v-card-actions>
    </v-card>
  </div>
</template>
