<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { Ref } from "vue";
import type { Question } from "@/types/quiz";
import { storeToRefs } from "pinia";
const route = useRoute();

import FormQuestion from "../../components/FormQuestion.vue";

import { useQuizStore } from "@/stores/quiz";

const quizStore = useQuizStore();

const { quizLoading } = storeToRefs(quizStore);
const formKey: Ref<number> = ref(0);

onMounted(async (): Promise<void> => {
  await quizStore.getQuiz(route.params.quiz_id);
});

const emptyQuestion = {
    id: "",
    question: "",
    answer_1: "",
    answer_2: "",
    answer_3: "",
    answer_4: "",
    correct: 0,
  };

const currentQuestion = ref(emptyQuestion);
const isQuestionEditing = ref(false);

const cancelQuestionForm = (): void => {
  isQuestionEditing.value = false;
  currentQuestion.value = emptyQuestion;
};
const toggleQuestionForm = (question?: Question): void => {
  formKey.value++;
  isQuestionEditing.value = true;
  currentQuestion.value = question;
};

const removeQuestion = async (id: string): Promise<void> => {
  await quizStore.removeQuestion(id);
  await quizStore.getQuiz(route.params.quiz_id);
};

const saveQuestion = async (formQuestion: Question): Promise<void> => {
  await quizStore.upsertQuestion(route.params.quiz_id, formQuestion);
  await quizStore.getQuiz(route.params.quiz_id);
  isQuestionEditing.value = false;
  currentQuestion.value = emptyQuestion;
};
</script>
<template>
  <div class="my-8">
    <h1 class="text-h3 mb-8">Editing</h1>

    <v-progress-circular
      v-if="quizLoading"
      indeterminate
      color="primary"
      class="mx-auto my-8"
    ></v-progress-circular>

    <v-card class="pa-4" v-else>
      <v-card-title> Questions: </v-card-title>

      <v-list>
        <v-list-item
          v-for="question in quizStore.quiz.questions"
          :key="question.id"
        >
          <v-list-item-title>
            <v-btn @click="toggleQuestionForm(question)" flat>
              {{ question.question }}
            </v-btn>
          </v-list-item-title>
          <template v-slot:append>
            <v-btn
              color="grey-lighten-1"
              icon="mdi-delete-outline"
              variant="text"
              @click="removeQuestion(question.id)"
            ></v-btn>
          </template>
        </v-list-item>
      </v-list>
      <v-divider />
      <v-card-actions>
        <v-btn @click="toggleQuestionForm" primary class="my-4 mx-4"
          >✨ Create new Question</v-btn
        >
      </v-card-actions>
    </v-card>

    <v-dialog width="500" v-model="isQuestionEditing">
      <v-card title="Dialog">
        <v-card-text>
          <form-question
            :question="currentQuestion"
            @save="saveQuestion"
            :key="formKey"
          />
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Cancel" @click="cancelQuestionForm"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
