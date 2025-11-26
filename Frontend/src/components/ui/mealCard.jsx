import { Link } from "react-router-dom";

export default function MealCard({ meal, clickable = true }) {
    const content = (
        <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow h-full">
            <div className="relative pb-[100%]">
                <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="w-full h-64 object-cover"
                />
            </div>
            <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-800 line-clamp-2">
                    {meal.strMeal}
                </h3>
                {clickable && (
                    <p className="text-orange-600 font-medium text-sm mt-2">
                        View Recipe →
                    </p>
                )}
            </div>
        </div>
    );

    if (clickable) {
        return (
            <Link to={`/recipe/${meal.idMeal}`} className="block">
                {content}
            </Link>
        );
    }

    return content;
}
