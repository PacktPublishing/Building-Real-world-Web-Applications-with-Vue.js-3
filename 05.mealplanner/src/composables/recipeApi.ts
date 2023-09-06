import type { SearchRecipe, Recipe } from '@/types/spoonacular'

const apiKey = import.meta.env.VITE_APP_SPOONACULAR_API;
const RECIPE_API = `https://api.spoonacular.com`
const API_SIGN = `apiKey=${apiKey}`

interface ApiOptions {
    query?: string;
}

export const useRecipeAPI = async (path: string, options?: ApiOptions): Promise<any> => {
    const query = options?.query ? getQuery(options?.query) : '';

    const requestURI = getRequestURI(path, query);

    return useFetch(requestURI);
}

const getQuery = (query?: string): string => {
    return query ? `&query=${query}` : ''
}

const getRequestURI = (path: string, query?: string): string => {
    const apiPath = `${RECIPE_API}/${path}`;
    return `${apiPath}?${API_SIGN}${query}`;
}

export const useFetch = async (requestURI: string): Promise<any> => {
    const res = await fetch(requestURI);
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    const jsonRes = await res.json();
    return jsonRes as any;
}

export const useRecipeSearch = async (query: string): Promise<SearchRecipe> => {
    try {
        return await useRecipeAPI('recipes/search', { query }) as any
    } catch {
        throw new Error('An error occurred while trying to search recipes');
    }
}

export const useRecipeInformation = async (id: string): Promise<Recipe> => {
    try {
        return await useRecipeAPI(`recipes/${id}/information`) as any
    } catch {
        throw new Error('An error occurred while trying to retrieve recipe information');
    }
}
