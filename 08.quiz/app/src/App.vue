<script setup lang="ts">
import { computed, watch } from 'vue'
import { RouterView, useRouter } from 'vue-router'

import { state } from '@/socket'

const router = useRouter()
const quizStatus = computed((): string | null => state.quizStatus)

// when quizStatus changes, check if it's "ready" and if so, redirect to /quiz
watch(quizStatus, (newStatus) => {
  if (newStatus === 'question') {
    router.push('/question')
  }
  if (newStatus === 'answer') {
    router.push('/answer')
  }
  if (newStatus === 'end') {
    router.push('/final')
  }
  if (newStatus === 'scoreboard') {
    router.push('/scoreboard')
  }
})
</script>

<template>
    <v-layout>
      <v-app-bar class="bg-primary pa-4"><h1 class="text-h5">Quiz time!</h1> </v-app-bar>
      <v-main>
        <RouterView />
      </v-main>
    </v-layout>
</template>