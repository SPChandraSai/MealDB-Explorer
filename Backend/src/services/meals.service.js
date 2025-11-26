// import { cache } from "./cache.service.js";
// import { fetchAPI } from "../utils/api.js";

// const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

// export async function getCategories() {
//     const key = "categories";

//     let data = cache.get(key);
//     if (!data) {
//         data = await fetchAPI(`${BASE_URL}/categories.php`);
//         cache.set(key, data);
//     }

//     return data;
// }

// export async function getRandomMeal() {
//     return fetchAPI(`${BASE_URL}/random.php`);
// }

// export async function searchMeals(query) {
//     return fetchAPI(`${BASE_URL}/search.php?s=${query}`);
// }

// export async function getMealById(id) {
//     return fetchAPI(`${BASE_URL}/lookup.php?i=${id}`);
// }

// export async function getMealsByCategory(category) {
//     return fetchAPI(`${BASE_URL}/filter.php?c=${category}`);
// }







import { cache } from "./cache.service.js";
import { fetchAPI } from "../utils/api.js";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

// Get all categories (frontend expects: { categories: [...] })
export async function getCategories() {
    const key = "categories";

    let data = cache.get(key);
    if (!data) {
        data = await fetchAPI(`${BASE_URL}/categories.php`);
        // data is { categories: [...] } from TheMealDB, and Index.jsx uses categoriesData.categories
        cache.set(key, data);
    }

    return data;
}

// Get a random meal (frontend expects: { meal: { ... } })
export async function getRandomMeal() {
    const cacheKey = "randomMeal";
    let cached = cache.get(cacheKey);
    if (cached) return cached;

    const res = await fetchAPI(`${BASE_URL}/random.php`);
    const rawMeal = res.meals && res.meals[0] ? res.meals[0] : null;

    const meal = rawMeal ? addIngredientsAndMeasures(rawMeal) : null;
    const data = { meal };

    cache.set(cacheKey, data);
    return data;
}

// Search meals (frontend expects: { meals: [...] } or meals === null)
export async function searchMeals(query) {
    if (!query) {
        return { meals: [] };
    }

    const cacheKey = `search_${query}`;
    let cached = cache.get(cacheKey);
    if (cached) return cached;

    const res = await fetchAPI(`${BASE_URL}/search.php?s=${query}`);
    // TheMealDB returns { meals: [...] } or { meals: null }
    const data = {
        meals: res.meals || [],
    };

    cache.set(cacheKey, data);
    return data;
}

// Get meal by ID (frontend expects: { meal: { ... } })
export async function getMealById(id) {
    const cacheKey = `meal_${id}`;
    let cached = cache.get(cacheKey);
    if (cached) return cached;

    const res = await fetchAPI(`${BASE_URL}/lookup.php?i=${id}`);
    const rawMeal = res.meals && res.meals[0] ? res.meals[0] : null;

    const meal = rawMeal ? addIngredientsAndMeasures(rawMeal) : null;
    const data = { meal };

    cache.set(cacheKey, data);
    return data;
}

// Get meals by category (frontend expects: { meals: [...] })
export async function getMealsByCategory(category) {
    const cacheKey = `category_${category}`;
    let cached = cache.get(cacheKey);
    if (cached) return cached;

    const res = await fetchAPI(`${BASE_URL}/filter.php?c=${category}`);
    // TheMealDB returns { meals: [...] } or { meals: null }
    const data = {
        meals: res.meals || [],
    };

    cache.set(cacheKey, data);
    return data;
}

// ───────────────────────── helpers ─────────────────────────

// Add ingredients[] and measures[] arrays to the meal object
function addIngredientsAndMeasures(meal) {
    const ingredients = [];
    const measures = [];

    for (let i = 1; i <= 20; i++) {
        const ing = meal[`strIngredient${i}`];
        const meas = meal[`strMeasure${i}`];

        if (ing && ing.toString().trim()) {
            ingredients.push(ing);
            measures.push(meas ? meas.toString().trim() : "");
        }
    }

    return {
        ...meal,
        ingredients,
        measures,
    };
}
