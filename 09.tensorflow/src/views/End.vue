<template>
  <v-card class="pa-4">
    <v-card-title>
      <h1 class="text-h3 text-md-h2 text-wrap">It's over!</h1>
    </v-card-title>
    <v-card-text>
      <p>Let's see how you did!</p>
    </v-card-text>
    <ScoreCard />
    <v-card-actions class="justify-center">
      <StartGame>Play Again?</StartGame>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import ScoreCard from "@/components/ScoreCard.vue";
import StartGame from "@/components/StartGame.vue";
</script>
