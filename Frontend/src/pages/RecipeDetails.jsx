import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, Play } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/ui/header";

export default function RecipeDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: mealData, isLoading, error } = useQuery({
        queryKey: ["meal", id],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/api/meals/${id}`);
            return res.json();
        },
        enabled: !!id,
    });

    const meal = mealData?.meal;

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
                <Header />
                <div className="flex items-center justify-center h-96">
                    <p className="text-lg text-gray-600">Loading recipe...</p>
                </div>
            </div>
        );
    }

    if (error || !meal) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
                <Header />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <button
                        onClick={() => navigate("/")}
                        className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold mb-6"
                    >
                        <ChevronLeft className="w-5 h-5" />
                        Back to Home
                    </button>
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        <p className="font-semibold">Recipe not found</p>
                        <p className="text-sm">The recipe you're looking for doesn't exist.</p>
                    </div>
                </div>
            </div>
        );
    }

    const ingredientsList = meal.ingredients
        .map((ing, i) => ({
            ingredient: ing,
            measure: meal.measures[i] || "",
        }))
        .filter((item) => item.ingredient.trim());

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
            <Header />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold mb-6"
                >
                    <ChevronLeft className="w-5 h-5" />
                    Back
                </button>

                {/* Recipe Header */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg mb-8">
                    <img
                        src={meal.strMealThumb}
                        alt={meal.strMeal}
                        className="w-full h-96 object-cover"
                    />
                    <div className="p-6 sm:p-8">
                        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">
                            {meal.strMeal}
                        </h1>
                        <div className="flex flex-wrap gap-4 text-lg text-gray-600 mb-6">
                            <span className="font-semibold">{meal.strCategory}</span>
                            <span className="text-gray-400">•</span>
                            <span className="font-semibold">{meal.strArea}</span>
                        </div>

                        {meal.strYoutube && (
                            <a
                                href={meal.strYoutube}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                            >
                                <Play className="w-5 h-5" />
                                Watch on YouTube
                            </a>
                        )}
                    </div>
                </div>

                {/* Ingredients and Instructions */}
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Ingredients */}
                    <div className="md:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                Ingredients
                            </h2>
                            <ul className="space-y-3">
                                {ingredientsList.map((item, index) => (
                                    <li
                                        key={index}
                                        className="flex gap-3 text-gray-700 pb-3 border-b border-gray-100 last:border-b-0"
                                    >
                                        <span className="font-semibold text-orange-600 min-w-16">
                                            {item.measure}
                                        </span>
                                        <span>{item.ingredient}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Instructions */}
                    <div className="md:col-span-2">
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                Instructions
                            </h2>
                            <div className="prose prose-sm max-w-none">
                                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                    {meal.strInstructions}
                                </p>
                            </div>

                            {meal.strTags && (
                                <div className="mt-8 pt-8 border-t border-gray-200">
                                    <h3 className="font-semibold text-gray-900 mb-3">Tags:</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {meal.strTags.split(",").map((tag) => (
                                            <span
                                                key={tag}
                                                className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium"
                                            >
                                                {tag.trim()}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {meal.strSource && (
                                <div className="mt-6">
                                    <a
                                        href={meal.strSource}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-orange-600 hover:text-orange-700 font-semibold"
                                    >
                                        See original source →
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-300 mt-16 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-sm">
                        Data provided by{" "}
                        <a
                            href="https://www.themealdb.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-orange-400 hover:text-orange-300"
                        >
                            TheMealDB
                        </a>
                    </p>
                </div>
            </footer>
        </div>
    );
}
