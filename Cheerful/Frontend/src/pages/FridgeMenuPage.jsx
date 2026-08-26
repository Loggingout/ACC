import { Box } from "lucide-react";
import MenuCategoryPage from "../features/menu/components/MenuCategoryPage";

export default function FridgeMenuPage() {
    return (
        <MenuCategoryPage
            slug="fridge"
            title="Fridge Items"
            icon={Box}
            description="Grab-and-go drinks, snacks, and salads."
        />
    );
}
