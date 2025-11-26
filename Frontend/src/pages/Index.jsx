import { Input } from "../components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { Dice5, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import Header from "../components/ui/header";

export default function Index() {
    const [searchInput, setSearchInput] = useState("");
    const navigate = useNavigate();

    const { data: categoriesData } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const res = await fetch("http://localhost:5000/api/meals/categories");
            return res.json();
        },
    });

    const { data: randomMealData } = useQuery({
        queryKey: ["randomMeal"],
        queryFn: async () => {
            const res = await fetch("http://localhost:5000/api/meals/random");
            return res.json();
        },
    });

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchInput.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchInput)}`);
        }
    };

    const handleRandomMeal = async () => {
        const res = await fetch("http://localhost:5000/api/meals/random");
        const data = await res.json();
        if (data.meal && data.meal.idMeal) {
            navigate(`/recipe/${data.meal.idMeal}`);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
            <Header />

            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                <div className="text-center mb-12">
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4">
                        Discover Delicious Recipes
                    </h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Explore thousands of meals from around the world
                    </p>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
                        <div className="flex gap-2">
                            <Input
                                type="text"
                                placeholder="Search for meals..."
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-orange-500 focus:outline-none text-lg"
                            />
                            <Button
                                type="submit"
                                className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2"
                            >
                                <Search className="w-5 h-5" />
                                Search
                            </Button>
                        </div>
                    </form>

                    {/* Random Meal Button */}
                    <button
                        onClick={handleRandomMeal}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white px-8 py-3 rounded-lg font-semibold transition-all hover:shadow-lg"
                    >
                        <Dice5 className="w-5 h-5" />
                        I'm Feeling Lucky
                    </button>
                </div>
            </section>

            {/* Featured Meal */}
            {randomMealData?.meal && (
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                        Featured Meal
                    </h3>
                    <div className="grid md:grid-cols-2 gap-8 items-center bg-white rounded-2xl overflow-hidden shadow-lg">
                        <img
                            src={randomMealData.meal.strMealThumb}
                            alt={randomMealData.meal.strMeal}
                            className="w-full h-96 object-cover"
                        />
                        <div className="p-6 sm:p-8">
                            <h4 className="text-3xl font-bold text-gray-900 mb-2">
                                {randomMealData.meal.strMeal}
                            </h4>
                            <p className="text-orange-600 font-semibold mb-4">
                                {randomMealData.meal.strCategory} • {randomMealData.meal.strArea}
                            </p>
                            <p className="text-gray-600 line-clamp-4 mb-6">
                                {randomMealData.meal.strInstructions}
                            </p>
                            <Button
                                onClick={() =>
                                    navigate(`/recipe/${randomMealData.meal.idMeal}`)
                                }
                                className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2"
                            >
                                View Full Recipe
                            </Button>
                        </div>
                    </div>
                </section>
            )}

            {/* Categories Section */}
            {categoriesData?.categories && (
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
                        Explore Categories
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {categoriesData.categories.slice(0, 12).map((category) => (
                            <button
                                key={category.idCategory}
                                onClick={() => navigate(`/category/${category.strCategory}`)}
                                className="group relative overflow-hidden rounded-lg aspect-square cursor-pointer hover:shadow-lg transition-all"
                            >
                                <img
                                    src={category.strCategoryThumb}
                                    alt={category.strCategory}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-end justify-center p-3">
                                    <p className="text-white font-semibold text-center text-sm">
                                        {category.strCategory}
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>
                </section>
            )}

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
