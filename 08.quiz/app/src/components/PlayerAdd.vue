<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import { socket, state } from '@/socket'

const username: Ref<string> = ref('')

const addPlayer = (): void => {
  socket.emit('player:ready', username.value)
}

const playersInLobby = computed(() => {
  return state.players
})

const self = computed(() => {
  return state.selfId
})

const selfInLobby = computed(() => {
  return playersInLobby.value.findIndex((player) => player.id === self.value) > -1
})

const start = (): void => {
  socket.emit('quiz:start')
}
</script>
<template>
  <v-card class="pa-4">
    <form @submit.prevent="addPlayer">
      <v-text-field
        label="Enter your name to play"
        v-model="username"
        :disabled="selfInLobby"
      ></v-text-field>
      <v-btn type="submit" v-if="!selfInLobby">Enter</v-btn>
    </form>
    <v-btn primary v-if="selfInLobby" @click="start">Start</v-btn>
  </v-card>
</template>
