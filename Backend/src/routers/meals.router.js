import { Router } from "express";
import {
    categories,
    randomMeal,
    search,
    getById,
    byCategory
} from "../controllers/meals.controller.js";

const router = Router();

console.log("🛠 USING MAIN MEALS ROUTER");

router.get("/categories", categories);
router.get("/random", randomMeal);
router.get("/search", search);
router.get("/category/:category", byCategory);
router.get("/:id", getById);

export default router;
