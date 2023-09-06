export interface SearchRecipe {
    results: RecipeResults[],
    offset: number,
    number: number,
    totalResults: number
}

export interface RecipeResults {
    id: number,
    title: string,
    image?: string,
    imageType?: string,
    readyInMinutes?: number;
    sourceUrl?: string;
    summary: string,
    dishTypes: string[],
}

export interface Recipe {
    vegetarian: boolean;
    vegan: boolean;
    glutenFree: boolean;
    dairyFree: boolean;
    veryHealthy: boolean;
    cheap: boolean;
    veryPopular: boolean;
    sustainable: boolean;
    lowFodmap: boolean;
    weightWatcherSmartPoints: number;
    gaps: string;
    preparationMinutes: number;
    cookingMinutes: number;
    aggregateLikes: number;
    healthScore: number;
    creditsText: string;
    license: string;
    sourceName: string;
    pricePerServing: number;
    extendedIngredients: ExtendedIngredient[];
    id: number;
    title: string;
    readyInMinutes: number;
    servings: number;
    sourceUrl: string;
    image: string;
    imageType: string;
    summary: string;
    cuisines: string[];
    dishTypes: string[];
    diets: string[];
    occasions: string[];
    winePairing: WinePairing;
    instructions: string;
}

interface IngredientMeasurements {
    us: {
        amount: number;
        unitShort: string;
        unitLong: string;
    };
    metric: {
        amount: number;
        unitShort: string;
        unitLong: string;
    };
}

interface ExtendedIngredient {
    id: number;
    aisle: string;
    image: string;
    consistency: string;
    name: string;
    nameClean: string;
    original: string;
    originalName: string;
    amount: number;
    unit: string;
    meta: string[];
    measures: IngredientMeasurements;
}

interface WinePairingProductMatch {
    id: number;
    title: string;
    description: string;
    price: string;
    imageUrl: string;
    averageRating: number;
    ratingCount: number;
}

interface WinePairing {
    pairedWines: string[];
    pairingText: string;
    productMatches: WinePairingProductMatch[];
}
