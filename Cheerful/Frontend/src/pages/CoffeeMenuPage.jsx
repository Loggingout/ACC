import { Coffee } from "lucide-react";
import MenuCategoryPage from "../features/menu/components/MenuCategoryPage";

export default function CoffeeMenuPage() {
    return (
        <MenuCategoryPage
            slug="coffee"
            title="Coffee"
            icon={Coffee}
            description="Espresso drinks, brewed coffee, and iced favorites."
        />
    );
}
