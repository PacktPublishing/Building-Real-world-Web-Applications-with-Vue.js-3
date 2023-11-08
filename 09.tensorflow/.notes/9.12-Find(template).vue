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