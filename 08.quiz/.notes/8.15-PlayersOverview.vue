<script setup lang="ts">
import { computed } from "vue";
import { state } from "@/socket";
import type { Player } from "@/types/quiz";

const playersInLobby = computed((): Player[] => {
  return state.players;
});

const self = computed((): string => {
  return state.selfId;
});

const avatarName = (name: string): string => {
  return name.slice(0, 2).toUpperCase() ?? "";
};
</script>

<template>
  <div class="mx-2 masonry">
    <div class="column masonry-container">
      <div class="hidden flex-break"></div>
      <div class="flex-break"></div>
      <div class="flex-break"></div>
      <div class="flex-break"></div>
      <v-card
        class="my-4 masonry-cell pa-4"
        tabindex="0"
        v-for="player in playersInLobby"
        :key="player.id"
        :variant="`${player.id === self ? 'tonal' : 'elevated'}`"
      >
        <v-avatar
          :color="`${player.id === self ? 'primary' : 'secondary'}`"
          class="mb-2 mr-2"
          >{{ avatarName(player.name || "Unknown") }}</v-avatar
        >
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
