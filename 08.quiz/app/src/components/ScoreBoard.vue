<script setup lang="ts">
import { computed } from 'vue'
import { state } from '@/socket'
import type { Player } from '@/types/quiz'

const players = computed((): Player[] => {
  return state.players
})

const self = computed((): string => {
  return state.selfId
})

const playersByScore = computed(() => {
  return [...players.value].sort((a: { score: number }, b: { score: number }) => b.score - a.score)
})
</script>
<template>
  <div>
    <v-card>
      <v-list>
        <v-list-item
          :key="`answer-${player.id}`"
          v-for="(player, index) in playersByScore"
          class="my-2"
        >
          <v-list-item-title :class="{ 'font-weight-bold': self === player.id }">{{
            `${index + 1}. ${player.name}`
          }}</v-list-item-title>
          <v-list-item-subtitle>{{
            `${player.score} point${player.score === 1 ? '' : 's'}`
          }}</v-list-item-subtitle>

          <template v-slot:append>
            <v-icon v-if="index === 0" icon="mdi-trophy" color="warning"></v-icon>
          </template>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>
