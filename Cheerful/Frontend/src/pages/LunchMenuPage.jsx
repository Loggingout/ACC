import { Utensils } from "lucide-react";
import MenuCategoryPage from "../features/menu/components/MenuCategoryPage";

export default function LunchMenuPage() {
    return (
        <MenuCategoryPage
            slug="lunch"
            title="Lunch"
            icon={Utensils}
            description="Burritos, hot dogs, tamales, and seasonal soups."
        />
    );
}
