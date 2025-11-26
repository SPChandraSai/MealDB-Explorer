import { useQuery } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/ui/header";
import MealCard from "../components/ui/mealCard";

export default function CategoryBrowser() {
    const { category } = useParams();
    const navigate = useNavigate();

    const { data: mealsData, isLoading, error } = useQuery({
        queryKey: ["category", category],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/api/meals/category/${encodeURIComponent(category || "")}`)
            return res.json();
        },
        enabled: !!category,
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
            <Header />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Back Button */}
                <button
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold mb-6"
                >
                    <ChevronLeft className="w-5 h-5" />
                    Back to Home
                </button>

                {/* Title */}
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2 capitalize">
                    {category} Recipes
                </h1>

                {/* Results */}
                {isLoading && (
                    <div className="text-center py-12">
                        <p className="text-lg text-gray-600">Loading recipes...</p>
                    </div>
                )}

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        <p className="font-semibold">Error loading recipes</p>
                        <p className="text-sm">Please try again</p>
                    </div>
                )}

                {!isLoading && mealsData?.meals && mealsData.meals.length > 0 && (
                    <>
                        <p className="text-lg text-gray-600 mb-8">
                            {mealsData.meals.length} meal{mealsData.meals.length !== 1 ? "s" : ""} in {category}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {mealsData.meals.map((meal) => (
                                <MealCard key={meal.idMeal} meal={meal} />
                            ))}
                        </div>
                    </>
                )}

                {!isLoading && (!mealsData?.meals || mealsData.meals.length === 0) && (
                    <div className="text-center py-12">
                        <p className="text-lg text-gray-600">No recipes found in this category</p>
                    </div>
                )}
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
