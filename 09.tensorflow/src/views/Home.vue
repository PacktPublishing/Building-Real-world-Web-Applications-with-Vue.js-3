<template>
  <v-card class="pa-4">
    <v-card-title>
      <h1 class="text-h3 text-md-h2 text-wrap">👀 Scavenge Hunter</h1>
    </v-card-title>
    <v-card-text>
      <p>Welcome to "Scavenge Hunter"! The game where you find things!</p>
    </v-card-text>
    <StatusCheck />
    <v-card-actions class="justify-center">
      <StartGame />
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import StartGame from "@/components/StartGame.vue";
import StatusCheck from "@/components/StatusCheck.vue";
</script>
