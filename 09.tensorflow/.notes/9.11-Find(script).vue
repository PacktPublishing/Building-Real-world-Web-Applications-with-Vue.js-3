<script lang="ts" setup>
import { onMounted, computed } from "vue";
import { useAppStore } from "@/store/app";
import { useGameStore } from "@/store/game";
import { storeToRefs } from "pinia";

import config from "@/config";

import SkipRound from "@/components/SkipRound.vue";

const appStore = useAppStore();
const gameStore = useGameStore();
const { currentCategory, objectsFound, skips, objectsLimit, score } =
  storeToRefs(gameStore);
const { getNewCategory } = gameStore;

const currentRound = computed(() => {
  return objectsFound.value + skips.value + 1;
});

const isPlaying = computed(() => {
  return currentRound.value <= objectsLimit.value;
});

const motivation = computed(() => {
  const motivationalQuotes = config.MOTIVATIONAL_QUOTES;
  const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
  return motivationalQuotes[randomIndex];
});

const skip = () => {
  skips.value++;
  if (score.value + config.SCORE_SKIP <= 0) {
    score.value = 0;
  } else {
    score.value += config.SCORE_SKIP;
  }
  newRound();
};

const newRound = () => {
  if (objectsFound.value + skips.value >= objectsLimit.value) {
    appStore.navigateToPage("/end");
  } else {
    getNewCategory();
  }
};

onMounted(() => {
  newRound();
});
</script>