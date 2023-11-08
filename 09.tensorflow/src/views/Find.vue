<template>
  <v-card class="pa-4" v-if="isPlaying">
    <v-card-subtitle class="justify-between my-2 d-flex">
      <h1 class="text-h5 text-md-h3 text-wrap">Round {{ currentRound }}</h1>
      <v-spacer />
      <h3 class="mx-auto text-h5 align-right">Score: {{ score }}</h3>
    </v-card-subtitle>
    <v-card-title>
      <h1 class="text-h4 text-md-h2 text-wrap">Find: {{ currentCategory }}</h1>
    </v-card-title>
    <v-card-text>
      <p>{{ motivation }}</p>
    </v-card-text>
    <CameraDetect @found="found" :disabled="detectionDisabled" />
    <v-card-actions class="justify-center">
      <v-btn @click="skip">Skip this category</v-btn>
    </v-card-actions>
  </v-card>
  <v-card
    flat
    height="320"
    class="justify-center text-center grey d-flex flex-column align-center pa-4"
    v-else
  >
    <v-progress-circular
      indeterminate
      :size="36"
      color="primary"
    ></v-progress-circular>
  </v-card>
</template>

<script lang="ts" setup>
import { onMounted, computed, ref } from "vue";
import type { Ref } from "vue";

import CameraDetect from "@/components/CameraDetect.vue";

import { useAppStore } from "@/store/app";
import { useGameStore } from "@/store/game";
import { storeToRefs } from "pinia";

import config from "@/config";

const appStore = useAppStore();
const gameStore = useGameStore();
const { currentCategory, objectsFound, skips, objectsLimit, score } =
  storeToRefs(gameStore);
const { getNewCategory } = gameStore;

const detectionDisabled: Ref<boolean> = ref(false);

const currentRound = computed(() => {
  return objectsFound.value + skips.value + 1;
});

const isPlaying = computed(() => {
  return currentRound.value <= objectsLimit.value;
});

const motivation = computed(() => {
  const motivationalQuotes = config.MOTIVATIONAL_QUOTES;
  const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
  return motivationalQuotes[randomIndex];
});

const skip = () => {
  detectionDisabled.value = true;
  skips.value++;
  if (score.value + config.SCORE_SKIP <= 0) {
    score.value = 0;
  } else {
    score.value += config.SCORE_SKIP;
  }
  newRound();
};

const found = (e: { class: string; score: number }) => {
  detectionDisabled.value = true;
  objectsFound.value++;
  const newScore = Math.round(
    config.SCORE_FOUND * (e.score + 1) * config.SCORE_ACCURACY_MULTIPLIER
  );
  score.value += newScore;
  newRound();
};

const newRound = () => {
  if (objectsFound.value + skips.value >= objectsLimit.value) {
    appStore.navigateToPage("/end");
  } else {
    getNewCategory();
    detectionDisabled.value = false;
  }
};

onMounted(() => {
  newRound();
});
</script>
