<script setup lang="ts">
import { computed } from 'vue'
import { state } from '@/socket'

const playersInLobby = computed((): { id: string, name: string }[] => {
  return state.players
})

const self = computed((): string => {
  return state.selfId
})

const avatarName = (name :string): string => {
  return name.slice(0, 2).toUpperCase() ?? ''
}
</script>

<template>
  <div class="masonry">
    <div class="column masonry-container">
      <div class="flex-break hidden"></div>
      <div class="flex-break"></div>
      <div class="flex-break"></div>
      <div class="flex-break"></div>
      <v-card
        class="masonry-cell pa-4 my-4"
        tabindex="0"
        v-for="player in playersInLobby"
        :key="player.id"
        :variant="`${player.id === self ? 'tonal' : 'elevated' }`"
      >
        <v-avatar :color="`${player.id === self ? 'primary' : 'secondary' }`" class="mr-2 mb-2">{{ avatarName(player.name) }}</v-avatar>
        {{ player.name }}
    </v-card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.masonry {
  .flex-break {
    flex: 1 0 100% !important;
    width: 0 !important;
  }

  $x: 3;

  @for $i from 1 through ($x - 1) {
    .masonry-container > div:nth-child(#{$x}n + #{$i}) {
      order: #{$i};
    }
  }

  .masonry-container > div:nth-child(#{$x}n) {
    order: #{$x};
  }

  .masonry-container {
    max-height: 700px;

    .masonry-cell {
      width: 25%;
      padding: 1px;
    }
  }
}
</style>
