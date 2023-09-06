import { ref } from "vue";
import { defineStore } from "pinia";

export const useCacheStore = defineStore('cache', () => {

    const cache = ref<any>([]);
    const cachedData = (key: string): any => {
        try {
            return cache.value[key]
        } catch (e) {
            return undefined;
        }
    }

    const cacheData = (key: string, data: any): void => {
        cache.value[key] = data
    }
    return { cachedData, cacheData }
});
