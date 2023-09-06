import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core"

import type { Recipe } from "@/types/spoonacular";
interface RecipeList extends Recipe {
    date: Date;
}

export const usePlannerStore = defineStore('planner', () => {
    const recipes = ref<Recipe[] | any>(useLocalStorage('planner', []));

    const recipesSortedByDate = () =>
        recipes.value.sort((a: { date : Date }, b: { date: Date }) => new Date(a.date).getTime() < new Date(b.date).getTime() ? -1 : 1)

    const pastRecipes = computed(() => {
        const sorted = recipesSortedByDate();
        return sorted.filter((recipe: RecipeList) => {
            const date = new Date(recipe.date);
            return date < new Date();
        }) as RecipeList[]
    })

    const futureRecipes = computed(() => {
        const sorted = recipesSortedByDate();
        return sorted.filter((recipe: RecipeList) => {
            const date = new Date(recipe.date);
            return date >= new Date();
        }) as RecipeList[];
    })

    const addRecipe = (recipe: Recipe) => {
        console.log('addRecipe', recipe)
        recipes.value.push(recipe)
    }

    const removeRecipeByIdDate = (options: { id: number, date: Date }) => {
        const { id, date } = options;
        const recipeIndex: number = recipes.value.findIndex((recipe: Recipe) => recipe.id === id && new Date(recipe.date).setHours(0, 0, 0, 0) === new Date(date).setHours(0, 0, 0, 0))
        recipes.value.splice(recipeIndex, 1)
    }

    return { recipes, pastRecipes, futureRecipes, addRecipe, removeRecipeByIdDate }
});
