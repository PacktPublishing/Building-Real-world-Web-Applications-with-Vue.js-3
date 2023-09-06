import { ref } from "vue";
import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core"

interface Rating {
    id: number;
    rating: number;
}

export const useRatingStore = defineStore('rating', () => {
    const ratings = ref<Rating[] | any>(useLocalStorage('rating', []));

    const getRatingById = (id: number) => {
        const rating = ratings.value.find((rating: Rating) => rating.id === id)
        return rating?.rating;
    }

    const saveRating = (rating: Rating) => {
        const ratingIndex = ratings.value.findIndex((r: Rating) => r.id === rating.id)
        if (ratingIndex === -1) {
            ratings.value.push(rating)
        } else {
            ratings.value[ratingIndex] = rating
        }
    }

    return { getRatingById, saveRating }
})
