import { Input } from "../components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, Search } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../components/ui/button";
import Header from "../components/ui/header";
import MealCard from "../components/ui/mealCard";

export default function SearchResults() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const query = searchParams.get("q") || "";

    const { data: resultsData, isLoading, error } = useQuery({
        queryKey: ["search", query],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/api/meals/search?q=${encodeURIComponent(query)}`);
            return res.json();
        },
        enabled: !!query,
    });

    const handleSearch = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newQuery = formData.get("q");
        if (newQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(newQuery)}`);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
            <Header />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Back Button & Search */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate("/")}
                        className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold mb-6"
                    >
                        <ChevronLeft className="w-5 h-5" />
                        Back to Home
                    </button>

                    <form onSubmit={handleSearch} className="max-w-2xl">
                        <div className="flex gap-2">
                            <Input
                                type="text"
                                name="q"
                                placeholder="Search for meals..."
                                defaultValue={query}
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
                </div>

                {/* Results */}
                {isLoading && (
                    <div className="text-center py-12">
                        <p className="text-lg text-gray-600">Searching for meals...</p>
                    </div>
                )}

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        <p className="font-semibold">Error loading results</p>
                        <p className="text-sm">Please try again</p>
                    </div>
                )}

                {!isLoading && resultsData?.meals && resultsData.meals.length > 0 && (
                    <>
                        <p className="text-lg text-gray-600 mb-6">
                            Found {resultsData.meals.length} meal{resultsData.meals.length !== 1 ? "s" : ""} for "{query}"
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {resultsData.meals.map((meal) => (
                                <MealCard key={meal.idMeal} meal={meal} />
                            ))}
                        </div>
                    </>
                )}

                {!isLoading && (!resultsData?.meals || resultsData.meals.length === 0) && (
                    <div className="text-center py-12">
                        <p className="text-lg text-gray-600 mb-4">
                            No meals found for "{query}"
                        </p>
                        <p className="text-gray-500">Try searching for something else</p>
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
