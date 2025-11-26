import { Link } from "react-router-dom";
import { ChefHat } from "lucide-react";

export default function Header() {
    return (
        <header className="bg-gradient-to-r from-orange-600 to-amber-600 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
                    <ChefHat className="w-8 h-8 text-white" />
                    <h1 className="text-3xl font-bold text-white">TheMealDB</h1>
                </Link>
            </div>
        </header>
    );
}
