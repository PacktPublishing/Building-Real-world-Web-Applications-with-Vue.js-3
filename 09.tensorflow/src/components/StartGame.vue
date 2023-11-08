<template>
  <v-btn
    :disabled="!canStart"
    @click="newGame"
    prepend-icon="mdi-trophy"
    append-icon="mdi-trophy"
    size="x-large"
    color="primary"
    ><slot>Start game!</slot></v-btn
  >
</template>
<script lang="ts" setup>
import { useAppStore } from "@/store/app";
import { useGameStore } from "@/store/game";
import { storeToRefs } from "pinia";
const gameStore = useGameStore();
const appStore = useAppStore();
const { canStart } = storeToRefs(gameStore);
const { reset } = gameStore;

const newGame = () => {
  reset();
  appStore.navigateToPage("/find");
};
</script>
