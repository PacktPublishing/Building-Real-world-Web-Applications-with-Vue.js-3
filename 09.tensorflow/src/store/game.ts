import { ref } from "vue";
import type { Ref } from "vue";
import { defineStore } from "pinia";

import { useObjectStore } from '@/store/object'

import config from '@/config'

export interface ObjectDetectionClass {
  name: string;
  id: number;
  displayName: string;
}

export const useGameStore = defineStore('game', () => {

  const canStart: Ref<boolean> = ref(false);

  const objectsLimit: Ref<number> = ref(config.MAX_ROUNDS);
  const objectsFound: Ref<number> = ref(0);
  const skips: Ref<number> = ref(0);

  const categoriesPast: Ref<string[]> = ref([]);
  const currentCategory: Ref<string> = ref('');

  const getNewCategory = (): void => {
    const objectStore = useObjectStore()
    const { objects } = objectStore;

    const getRandomCategory = (): string => {
      const availableCategories = objects.filter((item: string) => !categoriesPast.value.includes(item))
      if (availableCategories.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableCategories.length);
        const randomCategory = availableCategories[randomIndex];
        categoriesPast.value.push(randomCategory);
        return randomCategory;
      } else {
        categoriesPast.value = [];
        return getRandomCategory();
      }
    }
    currentCategory.value = getRandomCategory();
  }

  const score: Ref<number> = ref(0);

  const reset = () => {
    objectsFound.value = 0;
    skips.value = 0;
    categoriesPast.value = [];
    score.value = 0;
  }

  return { canStart, objectsLimit, objectsFound, skips, categoriesPast, currentCategory, getNewCategory, score, reset }
})