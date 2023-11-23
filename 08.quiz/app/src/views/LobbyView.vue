<script setup lang="ts">
import PlayerAdd from '@/components/PlayerAdd.vue'
import PlayersOverview from '@/components/PlayersOverview.vue'
</script>

<template>
  <div class="my-8">
    <h1 class="text-h3 mb-8">Welcome to the lobby</h1>
    <player-add />
    <players-overview class="my-8" />
  </div>
</template>
