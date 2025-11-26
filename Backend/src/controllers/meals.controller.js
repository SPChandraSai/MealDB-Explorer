import {
    getCategories,
    getRandomMeal,
    searchMeals,
    getMealById,
    getMealsByCategory
} from "../services/meals.service.js";

export const categories = async (req, res) => {
    try {
        const data = await getCategories();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const randomMeal = async (req, res) => {
    try {
        const data = await getRandomMeal();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const search = async (req, res) => {
    try {
        const q = req.query.q || "";
        const data = await searchMeals(q);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await getMealById(id);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const byCategory = async (req, res) => {
    try {
        const category = req.params.category;
        const data = await getMealsByCategory(category);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
